import { Link } from '@inertiajs/react';

function Show(props: {folder: {name: string, totalWorkTime: number, slug: string}}) {

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
        <div className='flex flex-col gap-6'>
          <h2 className='text-xl'>Schedules</h2>
          <ul className='join join-vertical'>
              <li className='card py-2 join-item'>
                <Link href="" >schedule.name</Link>
                <p>Work time : schedule.workTime</p>
                <p>By : user.name</p>
              </li>
              <li className='card py-2 join-item hover:bg-accent flex flex-row'>
                <Link href="" >schedule.name (task)</Link>
                <p>Work time : schedule.workTime (xx:xx)</p>
                <p>By : user.name (username)</p>
              </li>
              <li className='card py-2 join-item'>
                <Link href="" >schedule.name</Link>
                <p>Work time : schedule.workTime</p>
                <p>By : user.name</p>
              </li>

          </ul>

        </div>
        <p>Total work time : {props.folder.totalWorkTime}</p>
      </div>
    </>
  );
}

export default Show