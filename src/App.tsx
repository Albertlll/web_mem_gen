import { useState } from "react"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
// import { Button } from "@/components/ui/button"
import BaseImage from "./components/shared/BaseImage"
// import { Input } from "@/components/ui/input"
import { Stage, Layer, Rect } from "react-konva"
import { Vector2d } from "konva/lib/types"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
// import { KonvaEventObject } from "konva/lib/Node"
import ImageInputBtn from "./components/shared/ImageInputBtn"
import { Button } from "@/components/ui/button"
export function CardWithForm() {
  const [userBaseImage, setUserBaseImage] = useState<string | null>(null)
  const [memSize, setMemSize] = useState<{width : number, height: number}>({width: 500, height: 500})
  const [scale, setScale] = useState<Vector2d>({x: 1, y: 1})


  const handleSelectBaseImage = (imageList : FileList | null) => {
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

    if (e.evt.shiftKey) {
      setScale((prev) => ({
        x: prev.x * (1 - e.evt.deltaY * 0.001),
        y: prev.y * (1 - e.evt.deltaY * 0.001),
      }))
    }


  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={75} className="relative flex justify-center items-center !overflow-scroll">
        {userBaseImage ? 
        <>
            <Stage className="" scale={scale} onWheel={(e) => handleWheel(e)} width={memSize.width * scale.x} height={memSize.height * scale.y}>
 
              <Layer>
                <Rect width={memSize.width} height={memSize.height} fill="white" >

                </Rect>
              </Layer>

              <Layer>
                <BaseImage inp_image={userBaseImage}/>
              </Layer>
            </Stage>

            </>

        :
                'Сначала загрузите основу вашего мема!'      
        }
      
      </ResizablePanel>

      <ResizableHandle withHandle/>

      <ResizablePanel defaultSize={25} className="flex justify-center items-center">

        {userBaseImage ?
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel  defaultSize={85} className="relative flex flex-col justify-center items-center">
          <div className=" bg-background absolute right-5 flex flex-col justify-center h-1000 border-solid border-[1px] border-slate-500 p-5 rounded-sm">

          <ToggleGroup className="flex-col" type="single" orientation="vertical">
            <ToggleGroupItem className="left" value="text">Текст</ToggleGroupItem>
            <ToggleGroupItem value="photo">Фото</ToggleGroupItem>
            <ToggleGroupItem value="video">Видео</ToggleGroupItem>
            <ToggleGroupItem value="sound">Звук</ToggleGroupItem>
            <ToggleGroupItem value="shape">Фигура</ToggleGroupItem>
            <ToggleGroupItem value="background">Фон</ToggleGroupItem>
            <ToggleGroupItem value="effect">Эффект</ToggleGroupItem>
            <ToggleGroupItem value="other">Другое</ToggleGroupItem>
          </ToggleGroup>

          </div>

            <div className="absolute left-5 w-[calc(100%-156px)]">
            тут будут типа настройки текста там, позиционирование

            </div>
          </ResizablePanel>

          <ResizableHandle withHandle/>

          <ResizablePanel  defaultSize={15} className="flex flex-col gap-5 justify-center items-center">
              <ImageInputBtn selectHandle={handleSelectBaseImage} text='Поменять основу'/>
              <Button>Экспорт</Button>
          </ResizablePanel>

        </ResizablePanelGroup>
        :
        <ImageInputBtn selectHandle={handleSelectBaseImage} text='Загрузить основу мема!'/>

        }

      </ResizablePanel>
    </ResizablePanelGroup>
    
  )
}
