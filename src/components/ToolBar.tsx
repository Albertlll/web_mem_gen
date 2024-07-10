
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

function ToolBar() {
    return (
        <ToggleGroup className="flex-col" type="single" orientation="vertical">
            <ToggleGroupItem className="left" value="text">Текст</ToggleGroupItem>
            <ToggleGroupItem value="photo">Фото</ToggleGroupItem>
            <ToggleGroupItem value="video">Видео</ToggleGroupItem>
            <ToggleGroupItem value="sound">Звук</ToggleGroupItem>
            <ToggleGroupItem value="shape">Фигура</ToggleGroupItem>
            <ToggleGroupItem value="background">Фон</ToggleGroupItem>
            <ToggleGroupItem value="effect">Эффект</ToggleGroupItem>
            <ToggleGroupItem value="other">Другое</ToggleGroupItem>
          </ToggleGroup>
    );
}

export default ToolBar;