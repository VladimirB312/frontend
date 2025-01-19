import {SlideType} from "../../store/types.ts";
import {useAppActions} from "../../hooks/useAppAction.ts";
import {ChangeEvent} from "react";
import {RangeSlider} from "../../components/RangeSlider/RangeSlider.tsx";

type ImageEditControlsProps = {
    slide: SlideType | null,
    selectedElementId: string | null,
}

const ImageEditControls = ({slide, selectedElementId}: ImageEditControlsProps) => {
    const element = slide?.objects.find(el => el.id == selectedElementId)

    const {changeImageOpacity } = useAppActions()

    if (!element || element.type != 'image') {
        return (
            <div>
            </div>
        )
    }

    const handleOpacityChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeImageOpacity(parseFloat(event.target.value))
    }

    return (
        <div>
            <RangeSlider
                value={element.opacity}
                minValue={0}
                maxValue={1}
                step={0.05}
                onChange={handleOpacityChange}
                name={'Opacity'}
            />
        </div>
    )
}

export {ImageEditControls}