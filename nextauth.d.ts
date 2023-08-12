// import { DefaultSession, DefaultUser } from "next-auth";
// interface IUser extends DefaultUser {
//   /**
//    * Role of user
//    */
//   role?: "admin" | "user";
//   /**
//    * Field to check whether a user has a subscription
//    */
//   active?: boolean;
//   id?: string;
//   username?: string;
// }
// declare module "next-auth" {
//   interface User extends IUser { }
//   interface Session {
//     user?: User;
//   }
// }
// declare module "next-auth/jwt" {
//   interface JWT extends IUser { }
// }

// declare module "next-auth/providers" {
//   interface Credentials {
//     username: string;
//     password: string;
//   }
// }

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      username: string;
      role: "admin" | "user"
      active: boolean;
    };
  }
}