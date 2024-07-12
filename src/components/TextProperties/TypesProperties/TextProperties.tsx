import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
function TextProperties() {
    return (

        <div className="flex justify-between">

        <div>
            <Label htmlFor="email">x</Label>
            <Input className="w-20" type="email" id="email" placeholder="x" />
        </div>

        <div>
            <Label htmlFor="email">y</Label>
            <Input className="w-20" type="email" id="email" placeholder="y" />
        </div>

        </div>
    );
}

export default TextProperties;