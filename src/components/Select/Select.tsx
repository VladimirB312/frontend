import {dispatch} from "../../store/editor.ts";
import {setBackgroundColor} from "../../store/setBackgroundColor.ts";
import {ColorBackground, Slide} from "../../store/objects.ts";

type SelectProps = {
    slide: Slide | null
}

export function Select(props: SelectProps) {
    const colors = ['white', 'blue', 'green', 'red', 'yellow', 'orange'];

    if (!props.slide) {
        return <p>Цвет фона</p>
    }

    let selectedColor = props.slide.background.type == 'solid' ? props.slide.background.color : 'white'

    if (props.slide.background.type == 'solid') {
        selectedColor = props.slide.background.color
    }

    const handleColorChange: React.ChangeEventHandler = (event) => {
        const newBackgroundColor: ColorBackground = {
            type: 'solid',
            color: (event.target as HTMLInputElement).value,
        }

        dispatch(setBackgroundColor, newBackgroundColor)
    }
    return (
        <div>
            <p>Цвет фона</p>
            <select value={selectedColor} onChange={handleColorChange} style={{backgroundColor: selectedColor}}>
                {colors.map(color => (
                    <option key={color} value={color}>
                        {color}
                    </option>
                ))}
            </select>
        </div>
    )
}