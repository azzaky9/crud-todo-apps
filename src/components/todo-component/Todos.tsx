"use client";

import { useTodos } from "@/context/TodosContext";
import TodoCard from "./TodoCard";

// type TDataTodos = { todos: TPropTodoCard[] };

export default function Todos() {
  const { todosQ, user } = useTodos();
  const { data, isLoading, isError } = todosQ;

  if (isLoading) return <p>Loading..</p>;

  if (isError) return <p>Something went wrong</p>;

  return (
    <div className='h-96 overflow-y-scroll grid grid-cols-1 pr-10 lg:h-fit md:grid-cols-2 lg:grid-cols-3 lg:overflow-hidden xl:grid-cols-3  gap-x-5 gap-y-7 mx-20 w-full'>
      {data && user
        ? data.map((d) => (
            <TodoCard
              key={d.taskId}
              taskId={d.taskId}
              createdAt={d.createdAt}
              userId={d.userId}
              isComplete={d.isComplete}
              name={d.name}
            />
          ))
        : null}
    </div>
  );
}
