import {ImageFilterName} from "../store/types.ts";

type Filter = {
    name: ImageFilterName,
    minValue: number,
    maxValue: number,
    step: number,
    label: string,
}

const IMAGE_FILTERS: Filter[] = [
    {
        name: 'brightness',
        label: 'Brightness',
        minValue: 0,
        maxValue: 200,
        step: 5,
    },
    {
        name: 'contrast',
        label: 'Contrast',
        minValue: 0,
        maxValue: 200,
        step: 5,
    },
    {
        name: 'saturate',
        label: 'Saturate',
        minValue: 0,
        maxValue: 200,
        step: 5,
    },
    {
        name: 'sepia',
        label: 'Sepia',
        minValue: 0,
        maxValue: 100,
        step: 5,
    },
    {
        name: 'grayscale',
        label: 'Grayscale',
        minValue: 0,
        maxValue: 100,
        step: 5,
    },
    {
        name: 'blur',
        label: 'Blur',
        minValue: 0,
        maxValue: 10,
        step: 1,
    },
]

export {IMAGE_FILTERS}