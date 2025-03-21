/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

//import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createProject = async (data: FieldValues) => {
 // console.log(data);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
      method: "POST",
      headers: {
              "Content-Type": "application/json",
            },
      body:JSON.stringify(data),
    });
    revalidateTag("PROJECT");
    const result = await res.json();
   // console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get all projects
export const getAllProjects = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project`,
      {
        next: {
          tags: ["PROJECT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single product
export const getSingleProject = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`,
      {
        next: {
          tags: ["PROJECT"],
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
export const updateHouse = async (id: string, houseData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(houseData),
    });
    revalidateTag("PRODUCT");
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// delete house
export const deleteProject = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`,
      {
        method: "DELETE",
      }
    );
    revalidateTag("PROJECT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};