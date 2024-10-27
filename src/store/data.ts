import {PresentationType, Slide} from "./objects.ts";
import {EditorType} from "./EditorType.ts";

const slide1: Slide = {
    id: "1",
    background: {
        color: "#64e6ac",
        type: "solid"
    },
    objects: [
        {
            id: '1',
            position: {x: 40, y: 40},
            size: {width: 200, height: 200},
            type: "text",
            value: "Slide 1 text",
            textSize: 30,
            font: "sans-serif"
        },
        {
            id: "2",
            position: {x: 160, y: 160},
            size: {width: 150, height: 150},
            type: "image",
            src: "./src/assets/image1.png"
        },
    ]
}

const slide2: Slide = {
    id: "2",
    background: {
        src: "./src/assets/testBackground.jpg",
        type: "image"
    },
    objects: [
        {
            id: "1",
            position: {x: 50, y: 150},
            size: {width: 200, height: 50},
            type: "text",
            value: "Slide 2 text",
            textSize: 20,
            font: "sans-serif"
        },
        {
            id: "2",
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

const editor: EditorType = {
    presentation,
    selection: {
        activeSlideId: null,
        selectedElementId: null,
    }
}

export {
    editor
}