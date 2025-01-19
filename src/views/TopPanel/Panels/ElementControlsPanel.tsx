import {Button} from "../../../components/Button/Button.tsx";
import {textAddIcon, unsplashIcon} from "../../../components/icons.ts";
import {DownloadImage} from "../CustomButtons/DownloadImage.tsx";
import {useAppActions} from "../../../hooks/useAppAction.ts";

type ElementControlsPanelProps = {
    disabledSlideButton: boolean,
    onOpenUnsplash: () => void,
}

const ElementControlsPanel = ({
                                  disabledSlideButton,
                                  onOpenUnsplash
                              }: ElementControlsPanelProps) => {
    const {addTextElement,} = useAppActions()

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
        </>
    )
}

export {ElementControlsPanel}