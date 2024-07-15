import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PropertiesRrops } from "../Properties";

interface TextPropertiesProps extends PropertiesRrops {
    setBaseProperties : Function;
}
function TextProperties(props : TextPropertiesProps) {




    return (

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
    );
}

export default TextProperties;