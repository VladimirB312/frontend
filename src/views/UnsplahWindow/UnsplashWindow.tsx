import classes from './UnsplashWindow.module.css'
import {useEffect, useState} from "react";
import {useAppActions} from "../hooks/useAppAction.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";

type UnsplashWindowPropsType = {
    onCloseUnsplash: () => void
}

export function UnsplashWindow({onCloseUnsplash}: UnsplashWindowPropsType) {
    const [searchImg, setSearchImg] = useState("cats")

    const {requestImages, setUnsplashImageSelection, addUnsplashImageToSlide} = useAppActions()
    const unsplashImages = useAppSelector(state => state.present.unsplashImages)
    const unsplashImageSelectedId = useAppSelector(state => state.present.unsplashImageSelectedId)

    useEffect(() => {
        requestImages(searchImg)
    }, []);

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
                    {unsplashImages && unsplashImages.map((img) => {
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
                </div>

            </div>
        </div>
    )
}