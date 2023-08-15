"use client";

import React, { useState } from "react";
import Image from "next/image";
import googleIcon from "../../../public/ggl-icon.webp";
import { signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth, googleProvider } from "@/auth/config";
import { useRouter } from "next/navigation";
import { useTodos } from "@/context/TodosContext";

export default function AuthWithGoogle() {
  const route = useRouter();
  const [messageError, setMessageError] = useState<string | null>(null);
  const { setUser } = useTodos();

  const renderErrorMessage = messageError ? (
    <span className='text-[0.8rem] text-red-500'>{messageError}</span>
  ) : null;

  const handleAuth = async () => {
    try {
      const register = await signInWithPopup(auth, googleProvider);

      if (register.user) {
        const user = register.user;

        setUser(user);

        route.push("/");
      }
    } catch (error) {
      if (error instanceof FirebaseError) setMessageError(error.code);
    }
  };

  return (
    <React.Fragment>
      <button
        onClick={handleAuth}
        className='btn btn-wide btn-secondary flex gap-4'>
        <Image
          src={googleIcon}
          alt='google-icon'
          height={20}
          width={20}
        />
        <span className='mt-1'>Login With Google</span>
      </button>
      {renderErrorMessage}
    </React.Fragment>
  );
}
