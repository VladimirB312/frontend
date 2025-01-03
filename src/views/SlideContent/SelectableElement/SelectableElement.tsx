import classes from './SelectableElement.module.css'
import {ImageElement, TextElement} from "../../../store/types.ts";
import {TextComponent} from "../TextComponent/TextComponent.tsx";
import {ImageComponent} from "../ImageComponent/ImageComponent.tsx";
import {CSSProperties, RefObject, useRef} from "react";
import {GhostElement} from "./GhostElement.tsx";

type SelectableElementProps = {
    element: TextElement | ImageElement,
    selectedElementId?: string | null,
    scale: number,
    elementStyle?: string,
    id: string,
}

function SelectableElement({
                               element,
                               scale = 1,
                               elementStyle,
                               selectedElementId,
                               id
                           }: SelectableElementProps) {
    const elementRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

    const borderStyle: CSSProperties = {
        top: `${scale * element.position.y}px`,
        left: `${scale * element.position.x}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
    }

    return (
        <div>
            <div ref={elementRef}
                 data-element-id={id}
                 className={classes.element}
                 style={borderStyle}
            >
                {(() => {
                    switch (element.type) {
                        case 'text':
                            return (
                                <TextComponent
                                    element={element}
                                    scale={scale}
                                    elementStyle={elementStyle}
                                />
                            );
                        case 'image':
                            return (
                                <ImageComponent
                                    element={element}
                                    scale={scale}
                                    elementStyle={elementStyle}
                                />
                            );
                        default:
                            console.log("error type of object")
                    }
                })()}
            </div>
            <GhostElement element={element}
                          elementRef={elementRef}
                          scale={scale}
                          selectedElementId={selectedElementId}
            />
        </div>
    )
}

export {SelectableElement}