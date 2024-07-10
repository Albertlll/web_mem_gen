import { Button } from "@/components/ui/button";


function ImageInputBtn(props : {selectHandle : Function, text : string}) {
    return (
    <Button className="w-[300px]">
        <label htmlFor="fileInput" className="w-full">{props.text}</label>
        <input type="file" id="fileInput" onChange={(e) => props.selectHandle(e.target.files)} className="collapse"/>
    </Button>
    );
}

export default ImageInputBtn;