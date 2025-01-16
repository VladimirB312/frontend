import {ImageElement, TextElement} from "../../../store/types.ts";
import React from "react";
import classes from "./Resizers.module.css";
import {Direction} from "../../../hooks/useResize.tsx";

type ResizersProps = {
    element: TextElement | ImageElement,
    scale: number,
    onResize: (e: React.MouseEvent<HTMLDivElement>, element: (TextElement | ImageElement), dir: Direction, scale: number) => void;
}

const Resizers = ({
                      element,
                      scale = 1,
                      onResize,
                  }: ResizersProps) => {
    return (
        <>
            <div onMouseDown={(e) => onResize(e, element, "left", scale)}
                 data-resizer-id={'L'}
                 className={classes.resizerL}></div>
            <div onMouseDown={(e) => onResize(e, element, "top", scale)}
                 data-resizer-id={'T'}
                 className={classes.resizerT}></div>
            <div onMouseDown={(e) => onResize(e, element, "right", scale)}
                 data-resizer-id={'R'}
                 className={classes.resizerR}></div>
            <div onMouseDown={(e) => onResize(e, element, "bottom", scale)}
                 data-resizer-id={'B'}
                 className={classes.resizerB}></div>
            <div onMouseDown={(e) => onResize(e, element, "rightBottom", scale)}
                 data-resizer-id={'RB'}
                 className={classes.resizerRB}></div>
            <div onMouseDown={(e) => onResize(e, element, "leftBottom", scale)}
                 data-resizer-id={'LB'}
                 className={classes.resizerLB}></div>
            <div onMouseDown={(e) => onResize(e, element, "leftTop", scale)}
                 data-resizer-id={'LT'}
                 className={classes.resizerLT}></div>
            <div onMouseDown={(e) => onResize(e, element, "rightTop", scale)}
                 data-resizer-id={'RT'}
                 className={classes.resizerRT}></div>
        </>
    )
}

export {Resizers}