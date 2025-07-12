import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // 추가 미들웨어 로직이 필요한 경우 여기에 작성
    console.log("Middleware executed for:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // 토큰이 존재하면 인증된 것으로 간주
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin/:path*"],
};
