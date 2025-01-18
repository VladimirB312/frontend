import {Button} from "../../../components/Button/Button.tsx";
import {deleteIcon, textAddIcon, unsplashIcon} from "../../../components/icons.ts";
import {DownloadImage} from "../CustomButtons/DownloadImage.tsx";
import {useAppActions} from "../../../hooks/useAppAction.ts";

type ElementControlsPanelProps = {
    disabledSlideButton: boolean,
    disabledElementButton: boolean,
    onOpenUnsplash: () => void,
}

const ElementControlsPanel = ({
                                  disabledSlideButton,
                                  disabledElementButton,
                                  onOpenUnsplash
                              }: ElementControlsPanelProps) => {
    const {removeElement, addTextElement,} = useAppActions()

    return (
        <>
            <Button
                text={'Добавить текст'}
                onClick={addTextElement}
                disabled={disabledSlideButton}
                icon={textAddIcon}
            />
            <DownloadImage disabled={disabledSlideButton}/>
            <Button
                text={'Unsplash'}
                onClick={onOpenUnsplash}
                disabled={disabledSlideButton}
                icon={unsplashIcon}
            />
            <Button
                text={'Удалить элемент'}
                onClick={removeElement}
                disabled={disabledElementButton}
                icon={deleteIcon}
            />
        </>
    )
}

export {ElementControlsPanel}