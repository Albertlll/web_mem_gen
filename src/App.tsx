import { useState } from "react"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import BaseImage from "./components/BaseImage"
import { Input } from "@/components/ui/input"
import { Stage, Layer } from "react-konva"

export function CardWithForm() {
  const [userBaseImage, setUserBaseImage] = useState<string | null>(null)


  const handleSelectBseImage = (imageList : FileList | null) => {
    imageList && imageList[0] ?
    setUserBaseImage(URL.createObjectURL(imageList[0])) : null

  }
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={75} className="flex justify-center items-center">
        {userBaseImage ? 

        <img src={userBaseImage} alt="" />
            // <Stage width={500} height={500}>
            //   <Layer>
            //     <BaseImage inp_image={userBaseImage}/>
            //   </Layer>
            // </Stage>
        :
        'Сначала загрузите основу вашего мема!'      
        }
      
      </ResizablePanel>

      <ResizableHandle withHandle/>

      <ResizablePanel defaultSize={25} className="flex justify-center items-center">

          <Button className="w-[300px]">
          <label htmlFor="fileInput" className="w-full">Дайте загрузить основу мема!</label>

          <input type="file" id="fileInput" onChange={(e) => handleSelectBseImage(e.target.files)} className="collapse"/>
          </Button>
      </ResizablePanel>
    </ResizablePanelGroup>
    
  )
}
