import { Link } from "@inertiajs/react"
import { DateTime } from "luxon"

function Index (props : any)  {

  return (
    <>
      <div className="flex flex- flex-wrap justify-between items-center">
        <h1 className="w-3/4 font-bold text-2xl">List of Folders</h1>
        <Link href="/dashboard/folders/create" className="self-end btn btn-primary text-primary-content">Create</Link>
      </div>
      <ul className="max-h-[768px] overflow-scroll">
        {props.folders.map((folder: any) => (
          <li key={folder.id} className="py-6 px-2 rounded flex justify-between items-center hover:bg-white/5">
            <div>
              <p>{folder.name}</p>
              <p>{DateTime.fromISO(folder.createdAt).toFormat('dd/MM/yyyy')}</p>
            </div>
            <Link href={`/dashboard/folders/${folder.id}`} className="btn btn-accent">See</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Index