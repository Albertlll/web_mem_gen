import { useState } from "react"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"

// import useImage from 'use-image';

export function CardWithForm() {
  const [userBaseImage, setUserBaseImage] = useState(null)

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={75} className="flex justify-center items-center">
        {userBaseImage ? 
        <img src={userBaseImage} alt="User Base Image" className="h-24 w-24 rounded-full" />
        :
        'Сначала загрузите основу вашего мема!'      
        }
      
      </ResizablePanel>

      <ResizableHandle withHandle/>

      <ResizablePanel defaultSize={25} className="flex justify-center items-center">
        <Button>Дайте мне загрузить основу!</Button>
      </ResizablePanel>
    </ResizablePanelGroup>
    
  )
}
