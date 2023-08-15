import AuthWithGoogle from "@/components/auth-component/AuthWithGoogle";

export default function Login() {
  return (
    <div className='h-screen w-full flex justify-center items-center flex-col gap-10'>
      <h1 className='text-4xl font-semibold text-white'>
        Before you start you can login in here
      </h1>
      <div className='bg-base-200 px-10 py-5 w-fit rounded-lg shadow-xl'>
        <AuthWithGoogle />
      </div>
    </div>
  );
}
