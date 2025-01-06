import classes from './UnsplashWindow.module.css'
import {useEffect, useState} from "react";
import {useAppActions} from "../hooks/useAppAction.ts";
import {useExternalImagesSelector} from "../hooks/useAppSelector.ts";
import {Preloader} from "../../components/Preloader/Preloader.tsx";
import {Button} from "../../components/Button/Button.tsx";

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
        <div className={classes['modal-wrapper']}>
            <div className={classes.main}>
                <div className={classes.toolbar}>
                    <input
                        type="text"
                        placeholder="Search Anything..."
                        value={searchImg}
                        onChange={(e) => setSearchImg(e.target.value)}
                    />
                    <button onClick={Submit}>
                        Найти
                    </button>
                </div>
                <div>
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
                        text={'Добавить на слайд'}
                    />
                    <Button onClick={onCloseUnsplash}
                            text={'Закрыть'}
                    />
                    <Button
                        onClick={onSetPagePrev}
                        disabled={prevButtonDisabled}
                        text={'Назад'}
                    />
                    <Button
                        onClick={onSetPageNext}
                        disabled={nextButtonDisabled}
                        text={'Вперед'}
                    />
                </div>

            </div>
        </div>
    )
}

export {UnsplashWindow}