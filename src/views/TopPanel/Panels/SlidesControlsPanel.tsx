import {Button} from "../../../components/Button/Button.tsx";
import {addSlideIcon, deleteSlideIcon} from "../../../components/icons.ts";
import {useAppActions} from "../../../hooks/useAppAction.ts";
import classes from './SlidesControlsPanel.module.css'

type SlidesControlsPanelProps = {
    disabledSlideButton: boolean
}

const SlidesControlsPanel = ({disabledSlideButton}: SlidesControlsPanelProps) => {
    const {addSlide, removeSlide} = useAppActions()

    return (
        <div className={classes.slidesControls}>
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
        </div>
    )
}

export {SlidesControlsPanel}