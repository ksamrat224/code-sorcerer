"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
const Logout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <span
      className={className}
      onClick={() =>
        signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/login");
            },
          },
        })
      }
    >
      {children}
    </span>
  );
};

export default Logout;
