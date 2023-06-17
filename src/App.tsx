import { ScrollArea, ScrollBar } from "./components/ui/scroll-area"
import { Separator } from "./components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"

import { AlbumArtwork } from "./components/album-artwork"
import { Sidebar } from "./components/sidebar"
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder"

import { listenNowAlbums, madeForYouAlbums } from "./data/albums"
import { playlists } from "./data/playlists"
import { PlusCircle } from "lucide-react"

import "./styles/styles.css"

import { Button } from "./components/ui/button"


export default function MusicPage() {
  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">


          <div className="flex flex-col w-64 overflow-hidden border-r">

          <Sidebar playlists={playlists}  />

          </div>
          <div className="flex flex-col flex-grow">
       
              <div className="flex-grow overflow-auto ">
           

              </div>
          </div>
      </div>


    </>
  )
}
