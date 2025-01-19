import classes from './SideBar.module.css'
import {SlideType} from "../../store/types.ts";
import {LayerControls} from "./LayerControls.tsx";
import {TextEditControls} from "./TextEditControls.tsx";
import {ImageEditControls} from "./ImageEditControls.tsx";

type SideBarProps = {
    slide: SlideType | null,
    selectedElementId: string | null,
}

const SideBar = ({slide, selectedElementId}: SideBarProps) => {

    return (
        <div className={classes.sideBarWrapper}>
            <div className={`${classes.sideBar} ${!selectedElementId ? classes.emptySideBar : ''}`}>
                <LayerControls
                    slide={slide}
                    selectedElementId={selectedElementId}
                />
                <TextEditControls
                    slide={slide}
                    selectedElementId={selectedElementId}
                />
                <ImageEditControls
                    slide={slide}
                    selectedElementId={selectedElementId}
                />
            </div>
        </div>
    )
}

export {SideBar}