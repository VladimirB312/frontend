import {Button} from "../../components/Button/Button.tsx";
import {
    bringForwardIcon,
    bringFrontIcon,
    deleteIcon,
    sendBackwardIcon,
    sendToBackIcon
} from "../../components/icons.ts";
import {useAppActions} from "../../hooks/useAppAction.ts";
import {SlideType} from "../../store/types.ts";
import classes from './LayerControls.module.css'

type LayerControlsProps = {
    slide: SlideType | null,
    selectedElementId: string | null,
}

const LayerControls = ({slide, selectedElementId}: LayerControlsProps) => {
    const {
        moveElementForward,
        moveElementBackward,
        sendElementForward,
        sendElementBackward,
        removeElement,
    } = useAppActions()

    const elementIndex = slide?.objects.findIndex(element => element.id == selectedElementId)

    let disabledMoveForward = false
    const disabledMoveBackward = !selectedElementId || elementIndex == 0

    if (!selectedElementId || (slide && slide.objects.length - 1 == elementIndex)) {
        disabledMoveForward = true
    }

    return (
        <div className={classes.layerControls}>
            <Button
                text={'Переместить вперед'}
                onClick={moveElementForward}
                disabled={disabledMoveForward}
                icon={bringForwardIcon}
            />
            <Button
                text={'Переместить назад'}
                onClick={moveElementBackward}
                disabled={disabledMoveBackward}
                icon={sendBackwardIcon}
            />
            <Button
                text={'На передний план'}
                onClick={sendElementForward}
                disabled={disabledMoveForward}
                icon={bringFrontIcon}
            />
            <Button
                text={'На задний план'}
                onClick={sendElementBackward}
                disabled={disabledMoveBackward}
                icon={sendToBackIcon}
            />
            <Button
                text={'Удалить элемент'}
                onClick={removeElement}
                icon={deleteIcon}
            />
        </div>
    )
}

export {LayerControls}