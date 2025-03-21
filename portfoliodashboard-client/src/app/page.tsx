'use client'
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, setIsLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      router.push("/dashboard"); // Redirect to Dashboard if user exists
    } else {
      router.push("/login"); // Redirect to Login if no user
    }
    setIsLoading(false);
  }, [user, router, setIsLoading]);

  return null;
}

