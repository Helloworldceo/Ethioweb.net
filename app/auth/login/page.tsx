import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Login",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return <LoginForm initialError={params.error} />;
}
