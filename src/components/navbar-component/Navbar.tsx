"use client";

import Image from "next/image";
import user from "../../../public/user-2.svg";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/auth/config";
import { FirebaseError } from "firebase/app";

export default function Navbar() {
  const path = usePathname();
  const route = useRouter();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        route.push("/login");
      })
      .catch((err) => {
        if (err instanceof FirebaseError) {
          console.error(err.message, err.cause, err.code);
        }
      });
  };

  if (path === "/login") return;

  return (
    <nav className='navbar bg-transparent absolute top-0 w-full'>
      <div className='flex-1'></div>
      <div className='flex-none gap-2'>
        <div className='dropdown dropdown-end'>
          <label
            tabIndex={0}
            className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full '>
              <Image
                src={user}
                alt='user-ghost'
                height={20}
                width={20}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
            <li onClick={handleSignout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
