/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

//import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createBlog = async (data: FieldValues) => {
 // console.log(data);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      method: "POST",
      headers: {
              "Content-Type": "application/json",
            },
      body:JSON.stringify(data),
    });
    revalidateTag("BLOG");
    const result = await res.json();
   // console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get all projects
export const getAllblogs = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs`,
      {
        next: {
          tags: ["BLOG"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

//get single product
export const getSingleBlog = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`,
      {
        next: {
          tags: ["BLOG"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

//update house
export const updateBlog = async (id: string, houseData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(houseData),
    });
    revalidateTag("BLOG");
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// delete house
export const deleteBlog = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`,
      {
        method: "DELETE",
      }
    );
    revalidateTag("BLOG");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};