import classes from './UnsplashWindow.module.css'
import {useEffect, useState} from "react";
import {useAppActions} from "../hooks/useAppAction.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import Preloader from "../../components/Preloader/Preloader.tsx";

type UnsplashWindowPropsType = {
    onCloseUnsplash: () => void
}

export function UnsplashWindow({onCloseUnsplash}: UnsplashWindowPropsType) {
    const [searchImg, setSearchImg] = useState("cats")

    const {requestImages, setUnsplashPage, setUnsplashImageSelection, addUnsplashImageToSlide} = useAppActions()
    const unsplashImages = useAppSelector(state => state.present.unsplashState?.images)
    const unsplashImageSelectedId = useAppSelector(state => state.present.unsplashState?.imageSelectedId)
    const isFetching = useAppSelector(state => state.present.unsplashState?.isFetching)
    const currentPage = useAppSelector(state => state.present.unsplashState?.currentPage)
    const totalPages = useAppSelector(state => state.present.unsplashState?.totalPages)


    useEffect(() => {
        requestImages(searchImg)
    }, [searchImg]);

    const Submit = () => {
        requestImages(searchImg)
        setSearchImg('')
    }

    const onSelect = (id: string) => {
        setUnsplashImageSelection(id)
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

    const prevButtonDisabled = !!(currentPage && currentPage == 1)
    const nextButtonDisabled = !!(currentPage && currentPage == totalPages)

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
                <div>
                    <button
                        onClick={onAddImage}
                        disabled={!unsplashImageSelectedId}
                    >
                        Добавить на слайд
                    </button>
                    <button onClick={onCloseUnsplash}>
                        Закрыть
                    </button>
                    <button
                        onClick={onSetPagePrev}
                        disabled={prevButtonDisabled}>
                        Назад
                    </button>
                    <button
                        onClick={onSetPageNext}
                        disabled={nextButtonDisabled}>
                        Вперед
                    </button>
                </div>

            </div>
        </div>
    )
}