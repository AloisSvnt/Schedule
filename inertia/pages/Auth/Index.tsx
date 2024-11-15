import { Link } from '@inertiajs/react';

function Index(props: { user: any }) {
  return (
    <>
      {props.user ? (
        <div className='min-h-96'>
          <h1 className='text-3xl text-center'>Welcome back, {props.user.name}!</h1>
          <Link href="/auth/logout">Logout</Link>
        </div>
      ) : (
        <div className='min-h-60 flex flex-col gap-3'>
          <h1 className='text-3xl text-center'>Welcome, Guest!</h1>
          <p className='text-center'>Please login or register to continue.</p>
          <div className="flex-1 flex justify-center items-center gap-6">
            <Link className='btn btn-primary min-w-36' href="/auth/login">Login</Link>
            <Link className="btn btn-accent min-w-36" href="/auth/register">Register</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;