import { ScrollArea, ScrollBar } from "./components/ui/scroll-area"
import { Separator } from "./components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"

import { AlbumArtwork } from "./components/album-artwork"
import { Sidebar } from "./components/sidebar"
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder"

import { listenNowAlbums, madeForYouAlbums } from "./data/albums"
import { playlists } from "./data/playlists"
import { PlusCircle } from "lucide-react"

import "./styles/styles.scss"

import Home from "./pages/Home"
import { Button } from "./components/ui/button"

function App() {
  return (
    <>
      <div className="flex w-screen h-screen text-gray-700 overflow-hidden">
        <div className="flex flex-col w-64 !min-w-[16rem] !max-w-[16rem] overflow-hidden border-r">
          <Sidebar playlists={playlists}  />
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="flex-grow p-4">
            <div className="flex items-center flex-col">
              <Home />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-64 !min-w-[16rem] !max-w-[16rem] overflow-hidden border-l">
        <Sidebar playlists={playlists}  />
        </div>
      </div>
    </>
  )
}


export default App;
