import { requireAuth } from "@/module/auth/utils/auth-utils";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
  await requireAuth();
  return redirect('/dashboard')
}
