
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useEffect, useRef } from "react";
import { ToggleGroup  as TG} from "@radix-ui/react-toggle-group";
function ToolBar(props : {setCurrentTool : Function, value : string | undefined}) {
    

    return (
        <ToggleGroup value={props.value} onValueChange={(value) => {props.setCurrentTool(value)}} className="flex-col" type="single" orientation="vertical">
            <ToggleGroupItem value="text">Текст</ToggleGroupItem>
            <ToggleGroupItem value="photo">Фото</ToggleGroupItem>
            <ToggleGroupItem value="shape">Фигура</ToggleGroupItem>
            <ToggleGroupItem value="effect">Эффект</ToggleGroupItem>
          </ToggleGroup>
    );
}

export default ToolBar;