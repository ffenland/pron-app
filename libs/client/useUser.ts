import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface MeResponse {
  ok: boolean;
  profile: User;
}

const useUser = () => {
  const { data, error } = useSWR<MeResponse>(
    typeof window === "undefined" ? null : "/api/auth/me"
  );
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok && router.pathname !== "/auth/enter") {
      router.replace("/auth/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
};

export default useUser;
