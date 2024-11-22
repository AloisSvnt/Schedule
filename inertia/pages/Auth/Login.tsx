import React from 'react';
import { useForm } from '@inertiajs/react';

function Login() {

  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/login');
  }

  return (
    <>
      <div className='min-h-60 flex flex-col gap-3'>
        <h1 className='text-3xl text-center'>Welcome, Guest!</h1>
        <p className='text-center'>Please login or register to continue.</p>
        <div className="flex-1 flex justify-center items-center gap-6">

          <form onSubmit={submit} className='flex flex-col gap-3'>
            <label className="input input-bordered flex items-center gap-2 bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Username" value={data.username} onChange={e => setData('username', e.target.value)}  />
            </label>
            {errors.username && <div className="text-red-500">{errors.username}</div>}
            <label className="input input-bordered flex items-center gap-2  bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input type="password" className="grow" value={data.password} onChange={e => setData('password', e.target.value)} />
            </label>
            {errors.password && <div className="text-red-500">{errors.password}</div>}
            <button className='btn btn-primary w-full' type="submit" disabled={processing}>Login</button>
          </form>

        </div>
      </div>
    </>
  );
}

export default Login;