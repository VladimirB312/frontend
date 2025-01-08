import {PresentationType, SlideType} from "./types.ts";
import {EditorType} from "./types.ts";
import {validate} from "../ajvValidator.ts";

const slide1: SlideType = {
    id: "123123",
    background: {
        type: "gradient",
        direction: 'to right',
        color1: '#00FF00',
        color2: '#30578a'
    },
    objects: [
        {
            id: '311',
            position: {x: 40, y: 40},
            size: {width: 200, height: 200},
            type: "text",
            value: "Slide 1 text",
            textSize: 30,
            font: "Arial, sans-serif",
            color: '#000000',
            align: 'center',
        },
        {
            id: "241",
            position: {x: 160, y: 160},
            size: {width: 150, height: 150},
            type: "image",
            src: "./src/assets/image1.png"
        },
    ]
}

const slide2: SlideType = {
    id: "5235235",
    background: {
        src: "./src/assets/testBackground.jpg",
        type: "image"
    },
    objects: [
        {
            id: "135",
            position: {x: 50, y: 150},
            size: {width: 200, height: 50},
            type: "text",
            value: "Slide 2 text",
            textSize: 20,
            font: "Arial, sans-serif",
            color: '#000000',
            align: 'center',
        },
        {
            id: "182",
            position: {x: 150, y: 150},
            size: {width: 150, height: 150},
            type: "image",
            src: "./src/assets/testImage.png"
        },
    ]
}

const presentation: PresentationType = {
    title: "Presentation title",
    slides: [
        slide1,
        slide2
    ]
}

const defaultEditor: EditorType = {
    presentation,
    selection: {
        activeSlideId: null,
        selectedElementId: null,
    }
}

const getLocalEditor = () : EditorType => {
    const localPresentation = localStorage.getItem('presentationData')
    if (!localPresentation) {
        return defaultEditor
    }

    const localPresentationObj: PresentationType | null = JSON.parse(localPresentation)
    const valid = validate(localPresentationObj)
    if (localPresentationObj && valid) {
        console.log("valid json scheme from local storage")
        const selectedSlideId = localPresentationObj.slides.length ? localPresentationObj.slides[0].id : null
        return {
            presentation: localPresentationObj,
            selection: {
                selectedElementId: null,
                selectedSlidesId: selectedSlideId ? [selectedSlideId] : null,
                activeSlideId: selectedSlideId ?? null,
            }
        }
    } else {
        console.log("invalid json scheme from local storage", validate.errors)
        return defaultEditor
    }

}

export {
    getLocalEditor
}