import { Sidebar } from "./components/sidebar"
import { playlists } from "./data/playlists"

import "./styles/styles.scss"

import Home from "./pages/Home.jsx"

function App() {
  return (
    <>
      <div className="flex w-screen h-screen text-gray-700 overflow-hidden">
        <div className="flex flex-col w-64 !min-w-[16rem] !max-w-[16rem] overflow-hidden border-r">
          <Sidebar  />
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div></div>
          <div className="flex-grow p-4">
            <div className="flex items-center flex-col">
              <Home />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default App;
