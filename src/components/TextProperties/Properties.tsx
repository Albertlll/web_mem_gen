import TextProperties from "./TypesProperties/TextProperties";

interface PropertiesRrops {
    currrentElemType : string | undefined;
}

function Properties(props : PropertiesRrops) {
    return (

        <div className="w-72">
        {(() => {
        switch(props.currrentElemType) {
            case 'text':
                return <TextProperties/>
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