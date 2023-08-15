"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/auth/config";
import { UseQueryResult, useQuery } from "react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { TPropTodoCard } from "@/components/todo-component/TodoCard";

interface TInitialContext {
  user: User | null;
  todosQ: UseQueryResult<TPropTodoCard[] | undefined, unknown>;
}

const AuthContext = createContext({} as TInitialContext);

interface TPropUserProvider {
  children: React.ReactNode;
}

function UserProvider({ children }: TPropUserProvider) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        todosQ.refetch();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const todosQ = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        if (!user) throw FirebaseError;

        const todosRef = collection(db, "todos");
        const q = query(todosRef, where("userId", "==", user.uid));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => {
          return doc.data();
        }) as TPropTodoCard[];

        return data;
      } catch (error) {
        if (error instanceof FirebaseError) {
          const { code, cause, message } = error;
          console.error(code, message, cause);
        }
      }
    },
    staleTime: 1000 * 60 * 5
  });

  return (
    <AuthContext.Provider
      value={{
        todosQ,
        user
      }}>
      {children}
    </AuthContext.Provider>
  );
}

const useTodos = () => useContext(AuthContext);

export { UserProvider, useTodos };
