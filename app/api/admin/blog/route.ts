import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "helloworldceo";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "helloworldceo@1gmail.com";

async function requireAdmin(supabase: Awaited<ReturnType<typeof getSupabaseServerClient>>) {
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  const isUsernameAdmin = Boolean(ADMIN_USERNAME && profile?.username === ADMIN_USERNAME);
  const isEmailAdmin = Boolean(ADMIN_EMAIL && user.email === ADMIN_EMAIL);

  if (!isUsernameAdmin && !isEmailAdmin) return null;
  return user;
}

function permissionErrorMessage(raw: string) {
  if (raw.toLowerCase().includes("row-level security")) {
    return "Permission denied by Supabase RLS. Run the SQL policy in supabase/migrations/002_blog_write_policy.sql and retry.";
  }
  return raw;
}

export async function GET() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const user = await requireAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(request: NextRequest) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const user = await requireAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    is_published?: boolean;
  };

  const { title, slug, excerpt, content, is_published } = body;
  if (!title || !slug || !excerpt) {
    return NextResponse.json({ error: "title, slug, and excerpt are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      author_id: user.id,
      title,
      slug,
      excerpt,
      content: content ?? "",
      is_published: Boolean(is_published),
      published_at: is_published ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: permissionErrorMessage(error.message) }, { status: 500 });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return NextResponse.json({ post: data });
}

export async function PATCH(request: NextRequest) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const user = await requireAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    is_published?: boolean;
  };

  const { id, title, slug, excerpt, content, is_published } = body;
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      excerpt,
      content,
      is_published: Boolean(is_published),
      published_at: is_published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("author_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: permissionErrorMessage(error.message) }, { status: 500 });

  if (data?.slug) {
    revalidatePath(`/blog/${data.slug}`);
  }
  revalidatePath("/blog");
  return NextResponse.json({ post: data });
}

export async function DELETE(request: NextRequest) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const user = await requireAdmin(supabase);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as { id?: string };
  if (!body.id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", body.id)
    .eq("author_id", user.id);

  if (error) return NextResponse.json({ error: permissionErrorMessage(error.message) }, { status: 500 });

  revalidatePath("/blog");
  return NextResponse.json({ success: true });
}
