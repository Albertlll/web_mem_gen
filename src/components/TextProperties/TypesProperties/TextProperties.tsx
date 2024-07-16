import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PropertiesRrops } from "../Properties";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { useState, useEffect, CSSProperties } from "react";
import ColorPicker from 'react-best-gradient-color-picker';


interface TextPropertiesProps extends PropertiesRrops {
    setBaseProperties : Function;
}
function TextProperties(props : TextPropertiesProps) {
    const [color, setColor] = useState("#aabbcc");

    useEffect(() => {
        console.log(color);
        props.setBaseProperties({stroke : color, fill : color});
    }, [color])


    return (

        <div className="flex flex-col p-10 gap-3">

        <div>
            <Label htmlFor="text">Текст</Label>
            <Input onChange={(e) => props.setBaseProperties({text : e.target.value})} value={props.shapeContainer[props.selectedElem].text} className="w-full" type="text" id="text" placeholder="Текст" />
        </div>

        <div className="flex justify-between">

            <div>
                <Label htmlFor="x">x</Label>
                <Input onChange={(e) => props.setBaseProperties({x : parseInt(e.target.value)})} value={props.shapeContainer[props.selectedElem].x} className="w-20" type="number" id="x" placeholder="x" />
            </div>

            <div>
                <Label htmlFor="y">y</Label>
                <Input onChange={(e) => props.setBaseProperties({y : parseInt(e.target.value)})} value={props.shapeContainer[props.selectedElem].y} className="w-20" type="number" id="y" placeholder="y" />
            </div>

        </div>
        {/* <div className="w-full"> */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="w-full justify-start" variant="outline">
                        <div className={`w-4 h-4 rounded-[2px] mr-3 bg-[var(--smallColorWindow)]`} style={{'--smallColorWindow' : color} as CSSProperties}></div>
                        {color}
                    </Button>
                </PopoverTrigger>
                <PopoverContent side="left" className="w-90" sideOffset={20}>

                <ColorPicker value={color} onChange={setColor} />


                </PopoverContent>
            </Popover>

         {/* </div> */}
        </div>
    );
}

export default TextProperties;