"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useTodos } from "@/context/TodosContext";
import { db } from "@/auth/config";
import { FirebaseError } from "firebase/app";
import { v4 as uuid } from "uuid";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

export default function TodoField() {
  const [task, setTask] = useState("");
  const [errorField, setErrorField] = useState("");
  const { user, todosQ } = useTodos();
  const router = useRouter();

  if (!user?.uid && typeof window !== "undefined") router.push("/login");

  const handleTask = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorField("");

    setTask(e.currentTarget.value);
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: "createTask",
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();

      const uniqueTaskId = uuid();

      try {
        if (!user?.uid) throw FirebaseError;

        const todosRef = doc(db, "todos", uniqueTaskId);

        await setDoc(todosRef, {
          taskId: uniqueTaskId,
          userId: user.uid,
          name: task,
          createdAt: Timestamp.now(),
          isComplete: false
        });

        await todosQ.refetch();

        setTask("");
      } catch (error) {
        if (error instanceof FirebaseError)
          console.error(error.message, error.code, error.cause);
      }
    }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (task.length > 6) {
      return mutate(e);
    }

    setErrorField("maybe a little bit longer text");
  };

  return (
    <form
      className='flex gap-2 w-[480px]'
      onSubmit={handleSubmit}>
      <label>
        <input
          disabled={isLoading}
          name='task'
          type='text'
          value={task}
          onChange={handleTask}
          placeholder='Write your todo here'
          className='input input-bordered input-secondary  w-full max-w-lg'
        />
        <span className='text-sm font-semibold px-5'>
          {errorField && errorField}
        </span>
      </label>

      <button
        disabled={isLoading}
        type='submit'
        className='btn btn-md w-28'>
        {isLoading ? (
          <span className='loading loading-dots loading-md'></span>
        ) : (
          "submit"
        )}
      </button>
    </form>
  );
}
