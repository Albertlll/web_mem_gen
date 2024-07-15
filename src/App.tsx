import { useState, useRef, useEffect } from "react"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
// import { Button } from "@/components/ui/button"
import BaseImage from "./components/shared/BaseImage"
// import { Input } from "@/components/ui/input"
import { Stage, Layer, Rect } from "react-konva"
import { Vector2d } from "konva/lib/types"
import ToolBar from "./components/ToolBar"
// import { KonvaEventObject } from "konva/lib/Node"
import ImageInputBtn from "./components/shared/ImageInputBtn"
import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { KonvaEventObject } from "konva/lib/Node"
// import { Node } from "konva/lib/Node"
// import { Text } from "react-konva"
import { Layer as La } from "konva/lib/Layer"
import { Stage as St} from "konva/lib/Stage"
import { Transformer as Tr } from "konva/lib/shapes/Transformer"
// import { Text as Te } from "konva/lib/shapes/Text"
import TextField from "./components/shared/TextField"
// import { Ref } from "react";
import { TextConfig } from "konva/lib/shapes/Text";
import Properties from "./components/TextProperties/Properties"
import { ShapeConfig } from "konva/lib/Shape"


export interface TextFieldRrops extends TextConfig{
  type: string
}

export function CardWithForm() {
  const [userBaseImage, setUserBaseImage] = useState<string | null>(null)
  const [memSize, setMemSize] = useState<{width : number, height: number}>({width: 500, height: 500})
  const [scale, setScale] = useState<Vector2d>({x: 1, y: 1})
  const [currrentTool, setCurrentTool] = useState<string | undefined>(undefined)

  const [selectedElem, setSelectedElem] = useState<number | null>(null)


  // const [text, setText] = useState<string>("")


  const [draggings, setDragging] = useState<boolean>(false)
  const [shapeContainer, setShapeContainer] = useState<Array<TextFieldRrops>>([])


  const stageRef = useRef<St | null>(null) 
  const textLayerRef = useRef<La | null>(null) 
  const transformerRef = useRef<Tr | null>(null) 



  useEffect(() => {
    console.log(selectedElem)


    if (selectedElem != null && transformerRef.current != null && textLayerRef.current) {
      transformerRef.current.nodes([textLayerRef.current.getChildren()[selectedElem]])
    }

  }, [selectedElem])


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

  const textClick = (index : number) => {
    // const index = e.target.index

    // setTextFields([...textFields.slice(0, index), {...textFields[index], selected : true} ,...textFields.slice(index + 1)])

    setSelectedElem(index)
    stageRef.current?.draw()
    
  }



  const removeTransformer = () => {
    setSelectedElem(null);
  }

  const stageClick = (e : any) => {
    switch (currrentTool) {
      case '':
        console.log(selectedElem);
        (selectedElem || selectedElem == 0) &&removeTransformer();
        break;
      case "text":
        createClick(e)
        break;
      case "photo":
        break;
      case "shape":
        break;
      case "effect":
        break;

      default:
        break;
    }



  }


  const createClick = (e : any) => {
    const stage = e.target.getStage()
    const pos = stage.getPointerPosition()
    setShapeContainer(prev => [...prev, {
      x: pos.x / scale.x,
      y: pos.y / scale.y,
      fill: "red",
      stroke: "red",
      strokeWidth: 1,
      fontSize: 24,
      fontFamily: "Arial",
      text: "Одобрено",
      draggable: true,
      selected: false,
      type: "text"
      }])
  }
  

  const handleWheel = (e : any) => {

    if (e.evt.shiftKey) {
      setScale((prev) => ({
        x: prev.x * (1 - e.evt.deltaY * 0.001),
        y: prev.y * (1 - e.evt.deltaY * 0.001),
      }))
    }


  }

  const handleExport = () => {

    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL({
      quality: 0.9,
    })

    var link = document.createElement("a");
    link.href = uri;
    link.download = "exported_image.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
  }


  const rewriteCoords = (e : any) => {
    if (selectedElem === null) return;

    console.log(e.target.x(), e.target.y())

    setShapeContainer((prev: Array<TextFieldRrops>) =>
      [...prev.slice(0, (selectedElem !== null) ? selectedElem : -1),
      {...prev[selectedElem], x : e.target.x(), y : e.target.y()} ,
      ...prev.slice(selectedElem + 1)])

  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={75} className="relative flex justify-center items-center">
        {userBaseImage ? 
        <>
        <Stage ref={stageRef} onClick={(e) => stageClick(e)} scale={scale} onWheel={(e) => handleWheel(e)} width={memSize.width * scale.x} height={memSize.height * scale.y}>

 
          <Layer>
            <Rect width={memSize.width} height={memSize.height} fill="white" >

            </Rect>
          </Layer>

          <Layer>
            <BaseImage inp_image={userBaseImage}/>
          </Layer>

          <Layer ref={textLayerRef}>
            {shapeContainer.map((item, index) => (
              <>
              <TextField
                transformerRef={transformerRef}
                key={index}
                {...item}
                selected={selectedElem == index}
                onClick={() => {textClick(index)}}

                onDragStart={() => {setSelectedElem(index); setDragging(true)}}
                onDragEnd={(e : any) => {rewriteCoords(e)}}

                />
              </>
          
            ))}
            
            
          </Layer>


          </Stage>
            <div className=" bg-background absolute right-5 flex flex-col justify-center h-1000 border-solid border-[1px] border-slate-500 p-5 rounded-sm">
            <ToolBar value={currrentTool} setCurrentTool={setCurrentTool}/>
            </div>

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
            {(selectedElem || selectedElem==0) &&
            <Properties shapeContainer={shapeContainer}
                        selectedElem={selectedElem}
                        setShapeContainer={setShapeContainer}
                        />
            }
          </ResizablePanel>

          <ResizableHandle withHandle/>

          <ResizablePanel  defaultSize={15} className="flex flex-col gap-5 justify-center items-center">
              <ImageInputBtn selectHandle={handleSelectBaseImage} text='Поменять основу'/>
              <Button onClick={handleExport} className="w-[300px]">Экспорт</Button>
          </ResizablePanel>

        </ResizablePanelGroup>
        :
        <ImageInputBtn selectHandle={handleSelectBaseImage} text='Загрузить основу мема!'/>

        }

      </ResizablePanel>
    </ResizablePanelGroup>
    
  )
}
