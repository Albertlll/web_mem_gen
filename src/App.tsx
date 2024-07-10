import { useState, WheelEvent } from "react"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import BaseImage from "./components/BaseImage"
import { Input } from "@/components/ui/input"
import { Stage, Layer, Rect } from "react-konva"
import { Vector2d } from "konva/lib/types"
import { KonvaEventObject } from "konva/lib/Node"

export function CardWithForm() {
  const [userBaseImage, setUserBaseImage] = useState<string | null>(null)
  const [memSize, setMemSize] = useState<{width : number, height: number}>({width: 500, height: 500})
  const [scale, setScale] = useState<Vector2d>({x: 1, y: 1})


  const handleSelectBseImage = (imageList : FileList | null) => {
    if(imageList && imageList[0]) {
      const url = URL.createObjectURL(imageList[0])
      const mem = new Image();

      mem.src = url
      mem.onload = () => {
        setMemSize({
          height: mem.height,
          width : mem.width
        })
      }
      setUserBaseImage(url)

    }
    
  
  }

  const handleWheel = (e : any) => {

    setScale((prev) => ({
      x: prev.x * (1 - e.evt.deltaY * 0.001),
      y: prev.y * (1 - e.evt.deltaY * 0.001),
    }))
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={75} className="flex justify-center items-center !overflow-scroll">
        {userBaseImage ? 

        // <img src={userBaseImage} alt="" />
            <Stage className="" scale={scale} onWheel={(e) => handleWheel(e)} width={memSize.width * scale.x} height={memSize.height * scale.y}>
 
              <Layer>
                <Rect width={memSize.width} height={memSize.height} fill="white" >

                </Rect>
              </Layer>

              <Layer>
                <BaseImage inp_image={userBaseImage}/>
              </Layer>
            </Stage>
        :
        'Сначала загрузите основу вашего мема!'      
        }
      
      </ResizablePanel>

      <ResizableHandle withHandle/>

      <ResizablePanel defaultSize={25} className="flex justify-center items-center">



          <Button className="w-[300px]">
            <label htmlFor="fileInput" className="w-full">У меня есть свой шаблон</label>
            <input type="file" id="fileInput" onChange={(e) => handleSelectBseImage(e.target.files)} className="collapse"/>
          </Button>
      </ResizablePanel>
    </ResizablePanelGroup>
    
  )
}
