import { Text } from "react-konva";
// import { Text as TextClass } from "konva/lib/shapes/Text";
import { TextConfig } from "konva/lib/shapes/Text";
import { Transformer } from "react-konva";
import { Transformer as TransformerClass } from "konva/lib/shapes/Transformer";
import { Ref } from "react";


interface TextFieldRrops extends TextConfig {
    transformerRef : Ref<TransformerClass>;
}



function TextField(props : TextFieldRrops) {
    return (
        <>
        <Text
            {...props}
        />

        {props.selected &&
        <Transformer ref={props.transformerRef}/>
        }
        
        </>
        

    );
}

export default TextField;