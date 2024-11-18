import { Link } from '@inertiajs/react';

function Show(props: {folder: {name: string, totalWorkTime: number}}) {

  return (
    <div>
      <div className="flex">
        <h1>Folder Details</h1>
        <Link class="btn btn-primary w-28" href={`/dashboard/folders/${props.folder.slug}/edit`}>Edit</Link>
      </div>
      <div>
        <p>Folder name : {props.folder.name}</p>
        <p>Total work time : {props.folder.totalWorkTime}</p>
      </div>
    </div>
  );
}

export default Show