import TextProperties from "./TypesProperties/TextProperties";
import { TextFieldRrops } from "src/App";

export interface PropertiesRrops {
    shapeContainer : Array<TextFieldRrops>;
    setShapeContainer : Function;
    selectedElem : number; 
}

function Properties(props : PropertiesRrops) {

    // const setX = (x : number) => {
    //     simpleSetter({x : x})
    // }

    // const setY = (y : number) => {
    //     simpleSetter({y : y})
    // }

    // const setW = (w : number) => {
    //     simpleSetter({w : w})
    // }

    // const setH = (h : number) => {
    //     simpleSetter({h : h})
    // }

    const setBaseProperties = (setObj : {x : number} | {y : number} | {w : number} | {h : number}) => {
        
        props.setShapeContainer((prev: Array<TextFieldRrops>) =>
            [...prev.slice(0, (props.selectedElem || props.selectedElem==0) ? props.selectedElem : -1),
            {...prev[props.selectedElem], ...setObj} ,
            ...prev.slice(props.selectedElem + 1)])
    }


     if (props.selectedElem == null) return null;
    return (

        <div className="w-72">
        {(() => {
        switch(props.shapeContainer[props.selectedElem].type) {
            case 'text':
                return <TextProperties setBaseProperties={setBaseProperties} {...props}/>
            case 'photo':
                break;
            case 'shape':
                break;
            case 'effect':
                break;
            default:
                'тут будут настройки там все дела'
        }
        })()}
        </div>


    );
}

export default Properties;