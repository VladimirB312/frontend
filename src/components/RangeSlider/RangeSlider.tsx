import {ChangeEvent} from "react";

type RangeSliderProps = {
    value: number,
    minValue: number,
    maxValue: number,
    step: number,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    name: string,
}

const RangeSlider = ({
                         value,
                         minValue,
                         maxValue,
                         step,
                         onChange,
                         name
                     }: RangeSliderProps) => {
    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <input
                type="range"
                id={name}
                name={name}
                min={minValue}
                max={maxValue}
                value={value}
                step={step}
                onChange={onChange}
            />
        </div>
    )
}

export {RangeSlider}