"use client";

import { db } from "@/auth/config";
import { useTodos } from "@/context/TodosContext";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";

interface TPropToggleStatus {
  taskId: string;
  isComplete: boolean;
}

export function ToggleStatus({ isComplete, taskId }: TPropToggleStatus) {
  const [statusTask, setStatusTask] = useState(isComplete);

  const todosRef = doc(db, "todos", taskId);

  const { mutate } = useMutation({
    mutationKey: ["updateStatus"],
    mutationFn: async () => {
      try {
        await updateDoc(todosRef, {
          isComplete: !isComplete
        });

        setStatusTask(!statusTask);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => mutate();

  return (
    <React.Fragment>
      <input
        type='checkbox'
        checked={statusTask}
        onChange={handleCheck}
        className={`checkbox ${
          !statusTask ? "border-2 border-red-600" : "checkbox-success"
        }`}
      />
    </React.Fragment>
  );
}

export function DeleteTask({ isComplete, taskId }: TPropToggleStatus) {
  const [statusTask] = useState(isComplete);
  const { todosQ } = useTodos();

  const deleteTask = async () => {
    const todosRef = doc(db, "todos", taskId);

    await deleteDoc(todosRef);

    todosQ.refetch();
  };

  return (
    <button
      className='btn btn-square'
      onClick={deleteTask}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='#ff2424'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='lucide lucide-trash-2'>
        <path d='M3 6h18' />
        <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
        <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
        <line
          x1='10'
          x2='10'
          y1='11'
          y2='17'
        />
        <line
          x1='14'
          x2='14'
          y1='11'
          y2='17'
        />
      </svg>
    </button>
  );
}
