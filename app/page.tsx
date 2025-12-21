import { Button } from "@/components/ui/button";
import Logout from "@/module/auth/components/logout";
import { requireAuth } from "@/module/auth/utils/auth-utils";
import Image from "next/image";

export default async function Home() {
  await requireAuth();
  return (
    <div className="flex  flex-col items-center justify-center h-screen">
      <Logout>
        <Button className="mb-4">Log Out</Button>
      </Logout>
    </div>
  );
}
