import type { NextRequest } from "next/server";
import isAuthenticated from "./lib/auth";

export const config = {
  matcher: ["/((?!api|signin|signup|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return Response.json(
      { success: false, message: "authentication failed" },
      { status: 401 },
    );
  }
}
