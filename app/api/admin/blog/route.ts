import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { writeAuditEvent } from "@/lib/audit";
import { getViewerContext } from "@/lib/auth/viewer-context";

function permissionErrorMessage(raw: string) {
  if (raw.toLowerCase().includes("row-level security")) {
    return "Permission denied by Supabase RLS. Run the SQL policy in supabase/migrations/002_blog_write_policy.sql and retry.";
  }
  return raw;
}

export async function GET() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const { user, isAdmin } = await getViewerContext(supabase);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  const { data, error } = isAdmin
    ? await query
    : await query.eq("author_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(request: NextRequest) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const { user } = await getViewerContext(supabase);
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

  await writeAuditEvent({
    action: "blog.create",
    actorId: user.id,
    resource: "blog_posts",
    metadata: { slug, title, is_published: Boolean(is_published) },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return NextResponse.json({ post: data });
}

export async function PATCH(request: NextRequest) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const { user, isAdmin } = await getViewerContext(supabase);
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

  const query = supabase
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
    .eq("id", id);

  const { data, error } = await (isAdmin ? query : query.eq("author_id", user.id))
    .select()
    .maybeSingle();

  if (error) return NextResponse.json({ error: permissionErrorMessage(error.message) }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Post not found or not editable" }, { status: 404 });

  await writeAuditEvent({
    action: "blog.update",
    actorId: user.id,
    resource: "blog_posts",
    metadata: { id, slug: data?.slug, title: data?.title, is_published: data?.is_published },
  });

  if (data?.slug) {
    revalidatePath(`/blog/${data.slug}`);
  }
  revalidatePath("/blog");
  return NextResponse.json({ post: data });
}

export async function DELETE(request: NextRequest) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const { user, isAdmin } = await getViewerContext(supabase);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as { id?: string };
  if (!body.id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const query = supabase
    .from("blog_posts")
    .delete()
    .eq("id", body.id);

  const { error } = isAdmin
    ? await query
    : await query.eq("author_id", user.id);

  if (error) return NextResponse.json({ error: permissionErrorMessage(error.message) }, { status: 500 });

  await writeAuditEvent({
    action: "blog.delete",
    actorId: user.id,
    resource: "blog_posts",
    metadata: { id: body.id },
  });

  revalidatePath("/blog");
  return NextResponse.json({ success: true });
}
