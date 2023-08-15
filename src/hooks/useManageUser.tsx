"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/auth/config";
import { useUser } from "@/context/TodosContext";
import { useEffect } from "react";

export default function useManageUser() {
  const { setter } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        return setter(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);
}
