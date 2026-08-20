import { Outlet } from "react-router-dom";
import { PublicNavbar } from "@/components/landing/public-navbar";
import { PublicFooter } from "@/components/landing/public-footer";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
