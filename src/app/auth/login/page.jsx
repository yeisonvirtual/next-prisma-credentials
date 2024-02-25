"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"
import { useState } from "react";

const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [error, setError] = useState(null);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data)=>{

    console.log(data);

    const res = await signIn('credentials',{
      email: data.email,
      password: data.password,
      redirect: false
    });

    console.log(res);

    if (res.status!==200){
      setError(res.error);
    } else {
      router.push('/dashboard');
      router.refresh();
    }

  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        
        {
          error && (
            <p className="bg-red-500 text-white p-3 rounded">{error}</p>
          )
        }

        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
        
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email
        </label>
        <input
        className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        type="email"
        placeholder="email@gmail.com"
        {...register("email",{
          required: {
            value: true,
            message: 'Email is required'
          }
        })}
        />
        {
          errors.email && (
            <span className="text-red-600 text-sm">
              {errors.email.message}
            </span>
          )
        }

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password
        </label>
        <input
        className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        type="password"
        placeholder="******"
        {...register("password",{
          required: {
            value: true,
            message: 'Password is required'
          }
        })}
        />
        {
          errors.password && (
            <span className="text-red-600 text-sm">
              {errors.password.message}
            </span>
          )
        }

        <button type="submit" className="w-full bg-blue-500 text-white p-3 mt-5 rounded-lg">
          Login
        </button>

      </form>
    </div>
  )
}

export default LoginPage
