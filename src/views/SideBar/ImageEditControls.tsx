import {ImageFilterName, SlideType} from "../../store/types.ts";
import {useAppActions} from "../../hooks/useAppAction.ts";
import {ChangeEvent} from "react";
import {RangeSlider} from "../../components/RangeSlider/RangeSlider.tsx";
import {IMAGE_FILTERS} from "../../constants/imageFilters.ts";
import {Button} from "../../components/Button/Button.tsx";
import classes from './ImageEditControls.module.css'
import {resetIcon} from "../../components/icons.ts";

type ImageEditControlsProps = {
    slide: SlideType | null,
    selectedElementId: string | null,
}

const ImageEditControls = ({slide, selectedElementId}: ImageEditControlsProps) => {
    const element = slide?.objects.find(el => el.id == selectedElementId)

    const {changeImageOpacity, changeImageFilter, resetImageFilters} = useAppActions()

    if (!element || element.type != 'image') {
        return (
            <div>
            </div>
        )
    }

    const handleImageOpacityChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeImageOpacity(parseFloat(event.target.value))
    }

    const handleChangeImageFilter = (event: ChangeEvent<HTMLInputElement>, filterName: ImageFilterName) => {
        changeImageFilter(filterName, parseFloat(event.target.value))
    }

    return (
        <div className={classes.slidersWrapper}>
            <RangeSlider
                value={element.opacity}
                minValue={0}
                maxValue={1}
                step={0.05}
                onChange={handleImageOpacityChange}
                name={'Opacity'}
                unit={''}
            />
            {IMAGE_FILTERS.map(filter => (
                <RangeSlider
                    key={filter.name}
                    value={element[filter.name]}
                    minValue={filter.minValue}
                    maxValue={filter.maxValue}
                    step={filter.step}
                    onChange={(event) => handleChangeImageFilter(event, filter.name)}
                    name={filter.label}
                    unit={filter.unit}
                />
            ))}
            <Button text={'Сбросить фильтры'}
                    onClick={resetImageFilters}
                    icon={resetIcon}
            />
        </div>
    )
}

export {ImageEditControls}