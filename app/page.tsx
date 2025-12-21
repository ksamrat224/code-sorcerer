import { Button } from "@/components/ui/button";
import { requireAuth } from "@/module/auth/utils/auth-utils";
import Image from "next/image";

export default async function Home() {
  await requireAuth();
  return (
   <div className="flex  flex-col items-center justify-center h-screen">
    <Button className="mb-4"> Button</Button>
   </div>
  );
}
