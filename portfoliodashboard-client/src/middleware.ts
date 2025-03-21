import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authServices";


const authRoutes = ["/login"];


export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `https://portfoliodashboard-client-nu.vercel.app/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard",
    "/projects/:path*",
    "/blogs/:path*",
    "/changePassword",
    "/messages/:path*",
    "/skills/:path*"
  ],
};