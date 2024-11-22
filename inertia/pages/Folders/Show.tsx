import { Link } from '@inertiajs/react';

function Show(props: {folder: {name: string, slug: string}, schedules: {description: string, workTime: number, user: {username: string}}[]}) {

  const getTotalWorkTime = () => {
    return props.schedules.reduce((total, schedule) => total + schedule.workTime, 0)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Folder Details</h1>
        <div className="flex gap-6">
          <Link className="btn btn-primary w-28" href={`/dashboard/folders/${props.folder.slug}/edit`}>Edit</Link>
          <Link className="btn btn-error w-28" href={`/dashboard/folders/${props.folder.slug}/`} method="delete" as="button" type="button">Delete</Link>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <p>Folder name : {props.folder.name}</p>
        <div className='flex flex-col gap-3'>
          <h2 className='text-xl'>Schedules</h2>
          <div className='flex justify-between px-2'>
            <p className='w-1/4'>User</p>
            <p className='w-1/2'>Description</p>
            <p className='w-1/4 text-end'>Work time</p>
          </div>
          <ul className=''>
            {props.schedules.map((schedule, index) => (
              <li key={index} className='py-2 odd:bg-black/20 px-2'>
                <span className="flex justify-between">
                  <p className="min-w-10 w-1/4">{schedule.user.username}</p>
                  <p className="min-w-10 w-1/2">{schedule.description}</p>
                  <p className="min-w-10 w-1/4 text-end">{schedule.workTime}h</p>
                </span>
              </li>
            ))}

          </ul>

        </div>
        <p>Total work time : {getTotalWorkTime()}h</p>
      </div>
    </>
  );
}

export default Show