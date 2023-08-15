import { TodoField, Todos } from "@/components/todo-component/export-all";

export default function Home() {
  return (
    <main className='grid place-content-center mt-5'>
      <div className=' flex flex-col  gap-10  h-screen items-center w-full'>
        <div className='flex flex-col gap-5'>
          <h1 className='font-semibold text-6xl text-center'>Todo Apps</h1>
          <div className='flex gap-10'>
            <TodoField />
          </div>
        </div>
        <Todos />
      </div>
    </main>
  );
}
