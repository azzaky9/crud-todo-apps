"use client";

import { Timestamp } from "firebase/firestore";
import { DeleteTask, ToggleStatus } from "./TodoAction";

export interface TPropTodoCard {
  taskId: string;
  userId: string;
  name: string;
  createdAt: Timestamp;
  isComplete: boolean;
}

export default function TodoCard(prop: TPropTodoCard) {
  const { userId, name, createdAt, isComplete, taskId } = prop;

  const convertDates = (date: Timestamp | string) => {
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString();
    }
  };

  const dates = convertDates(createdAt);

  return (
    <div className='flex justify-center items-center gap-5 transition-all ease-in-out duration-300'>
      <ToggleStatus
        isComplete={isComplete}
        taskId={taskId}
      />
      <div className='card w-full bg-base-100 shadow-xl'>
        <div className='card-body py-4 px-7 grid grid-cols-5 place-content-center'>
          <div className='col-span-4'>
            <p className='font-semibold'>{name}</p>
            <span className='text-sm '>{dates}</span>
          </div>
          <div className='w-full grid place-content-end'>
            <DeleteTask
              taskId={taskId}
              isComplete={isComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
