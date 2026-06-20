import { DefaultSession } from "next-auth";
import { AppRole } from "@/lib/permissions";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      phone: string | null;
      role: AppRole;
    };
  }

  interface User {
    phone: string | null;
    role: AppRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    phone?: string | null;
    role?: AppRole;
  }
}
