import {useEffect, useState} from "react";

const useWindowResize = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    useEffect(() => {
        const handleResize = (event: Event) => {
            const target = event.target as Window
            setWidth(target.innerWidth)
            setHeight(target.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return {width, height}
}

export {
    useWindowResize
}