import { HeaderLayout } from "../HeaderLayout/HeaderLayout"
import FlashMessages from "~/Components/FlashMessage/FlashMessage"

export const DefaultLayout = (props : any) => {

  return (
    <>
      <div className="fixed top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="flex justify-center items-center flex-col min-h-screen">

        <HeaderLayout />

        <main className="flex-grow w-full max-w-7xl flex flex-col justify-center">
          <div className="flex bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
            <div className="container flex flex-col h-full py-12 px-12 gap-2">
              {props}
            </div>
          </div>
        </main>

      </div>
      <FlashMessages />
    </>
  )
}