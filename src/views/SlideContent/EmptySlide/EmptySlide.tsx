import classes from './EmptySlide.module.css'
import {useAppActions} from "../../../hooks/useAppAction.ts";

const EmptySlide = () => {

    const {addSlide} = useAppActions()

    const onAddSlide = () => {
        addSlide()
    }
    return (
        <div  className={classes.emptySlide}
              onClick={onAddSlide}
        >
            Нажмите, чтобы добавить новый слайд
        </div>
    )
}

export {EmptySlide}