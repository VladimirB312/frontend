import {ChangeEvent} from "react"
import classes from './RangeSlider.module.css'

type RangeSliderProps = {
    value: number,
    minValue: number,
    maxValue: number,
    step: number,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    name: string,
    unit: string,
}

const RangeSlider = ({
                         value,
                         minValue,
                         maxValue,
                         step,
                         onChange,
                         name,
                         unit,
                     }: RangeSliderProps) => {
    return (
        <div>
            <label
                className={classes.label}
                htmlFor={name}>{name}
            </label>
            <div className={classes.inputWrapper}>
                <input
                    type="range"
                    id={name}
                    name={name}
                    min={minValue}
                    max={maxValue}
                    value={value}
                    step={step}
                    onChange={onChange}
                    className={classes.input}
                />
                <span className={classes.inputUnit}>{value + unit}</span>
            </div>
        </div>
    )
}

export {RangeSlider}