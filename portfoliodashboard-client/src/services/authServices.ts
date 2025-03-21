/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  //console.log(userData);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    //console.log(result);
    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result.data.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};


export const getNewToken = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("refreshToken")!.value,
          },
        }
      );
  
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
};

export const logout=async()=>{
  (await cookies()).delete('accessToken')
}

export const changePassword = async (userData: FieldValues) => {
  //console.log(userData);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    //console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};