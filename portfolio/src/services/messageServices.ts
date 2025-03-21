/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

//import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createMessage = async (data: FieldValues) => {
 // console.log(data);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/msg`, {
      method: "POST",
      headers: {
              "Content-Type": "application/json",
            },
      body:JSON.stringify(data),
    });
    revalidateTag("MESSAGE");
    const result = await res.json();
   // console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};