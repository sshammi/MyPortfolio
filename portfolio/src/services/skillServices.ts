/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

//import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createSkill = async (data: FieldValues) => {
 // console.log(data);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`, {
      method: "POST",
      headers: {
              "Content-Type": "application/json",
            },
      body:JSON.stringify(data),
    });
    revalidateTag("SKILL");
    const result = await res.json();
   // console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get all projects
export const getAllSkills = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skill`,
      {
        next: {
          tags: ["SKILL"],
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
export const getSingleSkill = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`,
      {
        next: {
          tags: ["SKILL"],
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
export const updateSkill = async (id: string, houseData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(houseData),
    });
    revalidateTag("SKILL");
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// delete house
export const deleteSkill = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`,
      {
        method: "DELETE",
      }
    );
    revalidateTag("SKILL");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};