import {Button} from "../../../components/Button/Button.tsx";
import {addSlideIcon, deleteSlideIcon} from "../../../components/icons.ts";
import {useAppActions} from "../../../hooks/useAppAction.ts";

type SlidesControlsPanelProps = {
    disabledSlideButton: boolean
}

const SlidesControlsPanel = ({disabledSlideButton}: SlidesControlsPanelProps) => {
    const {addSlide, removeSlide} = useAppActions()

    return (
        <>
            <Button
                text={'Добавить слайд'}
                onClick={addSlide}
                icon={addSlideIcon}
            />
            <Button
                text={'Удалить слайд'}
                onClick={removeSlide}
                disabled={disabledSlideButton}
                icon={deleteSlideIcon}
            />
        </>
    )
}

export {SlidesControlsPanel}