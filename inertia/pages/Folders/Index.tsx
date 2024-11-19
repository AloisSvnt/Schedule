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
          <li key={folder.slug} className="py-6 px-2 rounded flex justify-between items-center hover:bg-white/5">
            <div>
              <p>{folder.name}</p>
              <p>{DateTime.fromISO(folder.createdAt).toFormat('dd/MM/yyyy')}</p>
            </div>
            <ul className="menu menu-horizontal bg-base-200 rounded-box">
              <li>
                <Link href={`/dashboard/folders/${folder.slug}/`} className="tooltip tooltip-bottom" data-tip="Open">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-5 w-5"
                    fill="CurrentColor"
                    stroke="none">
                    <path 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/>
                  </svg>
                </Link>
              </li>
              <li>
                <Link href={`/dashboard/folders/${folder.slug}/edit`} className="tooltip tooltip-bottom" data-tip="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-5 w-5"
                  fill="CurrentColor"
                  stroke="none">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/>
                  </svg>
                </Link>
              </li>
              <li>
                <Link href={`/dashboard/folders/${folder.slug}/`} method="delete" as="button" className="tooltip tooltip-bottom" data-tip="Delete">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="CurrentColor"
                    viewBox="0 0 448 512"
                    stroke="none">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                  </svg>
                </Link>
              </li>
            </ul>
            {/* <Link href={`/dashboard/folders/${folder.slug}`} className="btn btn-accent">See</Link> */}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Index