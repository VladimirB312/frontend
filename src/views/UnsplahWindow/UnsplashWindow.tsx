import classes from './UnsplashWindow.module.css'
import {useEffect, useState} from "react";
import {useAppActions} from "../hooks/useAppAction.ts";
import {useExternalImagesSelector} from "../hooks/useAppSelector.ts";
import {Preloader} from "../../components/Preloader/Preloader.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {addImageIcon, arrowLeftIcon, arrowRightIcon, closeIcon, searchIcon} from "../../components/icons.ts";

type UnsplashWindowPropsType = {
    onCloseUnsplash: () => void
}

const UnsplashWindow = ({onCloseUnsplash}: UnsplashWindowPropsType) => {
    const [searchImg, setSearchImg] = useState("cats")

    const {requestImages, setUnsplashPage, setExternalImageSelection, addUnsplashImageToSlide} = useAppActions()
    const externalImages = useExternalImagesSelector()

    const unsplashImages = externalImages?.images
    const unsplashImageSelectedId = externalImages?.imageSelectedId
    const isFetching = externalImages?.isFetching
    const currentPage = externalImages?.currentPage
    const totalPages = externalImages?.totalPages

    useEffect(() => {
        requestImages(searchImg)
    }, [searchImg]);

    const Submit = () => {
        requestImages(searchImg)
        setSearchImg('')
    }

    const onSelect = (id: string) => {
        setExternalImageSelection(id)
    }

    const onAddImage = () => {
        addUnsplashImageToSlide()
        onCloseUnsplash()
    }

    const onSetPagePrev = () => {
        if (currentPage) {
            setUnsplashPage(searchImg, currentPage - 1)
        }
    }

    const onSetPageNext = () => {
        if (currentPage) {
            setUnsplashPage(searchImg, currentPage + 1)
        }
    }

    const prevButtonDisabled = (!totalPages || !currentPage || currentPage == 1)
    const nextButtonDisabled = (!totalPages || !currentPage || currentPage === totalPages)

    return (
        <div className={classes.modalWrapper}>
            <div className={classes.main}>
                <div className={classes.toolbar}>
                    <input
                        type="text"
                        placeholder="Search Anything..."
                        value={searchImg}
                        onChange={(e) => setSearchImg(e.target.value)}
                    />
                    <Button
                        icon={searchIcon}
                        onClick={Submit}
                    />
                </div>
                <div className={classes.images}>
                    {isFetching ? <Preloader/> : unsplashImages && unsplashImages.map((img) => {
                        return (
                            <img
                                onClick={() => onSelect(img.id)}
                                key={img.id}
                                className={classes.image + ' ' + (img.id == unsplashImageSelectedId ? classes.active : '')}
                                src={img.src}
                            />
                        )
                    })}
                </div>
                <div className={classes.buttons}>
                    <Button
                        onClick={onAddImage}
                        disabled={!unsplashImageSelectedId}
                        icon={addImageIcon}
                        title={'Добавить картинку'}
                    />
                    <Button
                        onClick={onSetPagePrev}
                        disabled={prevButtonDisabled}
                        icon={arrowLeftIcon}
                        title={'Назад'}
                    />
                    <Button
                        onClick={onSetPageNext}
                        disabled={nextButtonDisabled}
                        icon={arrowRightIcon}
                        title={'Вперед'}
                    />
                    <Button onClick={onCloseUnsplash}
                            icon={closeIcon}
                            title={'Закрыть'}
                    />
                </div>

            </div>
        </div>
    )
}

export {UnsplashWindow}