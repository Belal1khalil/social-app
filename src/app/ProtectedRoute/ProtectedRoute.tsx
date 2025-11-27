"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/app/loading";

import { useAppSelector } from "@/store/user.hooks";

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();

  const { token } = useAppSelector((store) => store.userReducer);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) {
    return <Loading />;
  }

  return <>{children}</>;
}
