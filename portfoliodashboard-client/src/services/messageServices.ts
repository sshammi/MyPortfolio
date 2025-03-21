/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

//import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

// get all projects
export const getAllMessages = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/msg`,
        {
          next: {
            tags: ["MESSAGE"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };

// delete house
export const deleteMessage = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/msg/${id}`,
      {
        method: "DELETE",
      }
    );
    revalidateTag("MESSAGE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};