"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const RegisterPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data)=>{

    const { username, email, password, confirmPassword } = data;

    if (password !== confirmPassword) return alert('passsword not match')
    
    const res = await fetch('http://localhost:3000/api/auth/register',{
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const resJSON = await res.json();
    console.log(resJSON);

    if (res.status===200) {
      router.push('/auth/login');
    }

  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        
        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Username
        </label>
        <input
        className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        type="text"
        placeholder="youUsername"
        {...register("username",{
          required: {
            value: true,
            message: 'Username is required'
          }
        })}
        />
        {
          errors.username && (
            <span className="text-red-600 text-sm">
              {errors.username.message}
            </span>
          )
        }

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

        <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block text-sm">
          Confirm password
        </label>
        <input
        className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        type="password"
        placeholder="******"
        {...register("confirmPassword",{
          required: {
            value: true,
            message: 'Password not match'
          }
        })}
        />
        {
          errors.confirmPassword && (
            <span className="text-red-600 text-sm">
              {errors.confirmPassword.message}
            </span>
          )
        }

        <button type="submit" className="w-full bg-blue-500 text-white p-3 mt-5 rounded-lg">
          Register
        </button>

      </form>
    </div>
  )
}

export default RegisterPage