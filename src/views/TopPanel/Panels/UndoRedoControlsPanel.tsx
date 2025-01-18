import {Button} from "../../../components/Button/Button.tsx";
import {redoIcon, undoIcon} from "../../../components/icons.ts";
import {useAppActions} from "../../../hooks/useAppAction.ts";

type UndoRedoControlsPanelProps = {
    undoDisabled: boolean,
    redoDisabled: boolean,
}

const UndoRedoControlsPanel = ({
                                   undoDisabled, redoDisabled
                               }: UndoRedoControlsPanelProps) => {
    const {undo, redo} = useAppActions()

    return (
        <>
            <Button
                title={'Отменить'}
                onClick={undo}
                disabled={undoDisabled}
                icon={undoIcon}
            />
            <Button
                title={'Повторить'}
                onClick={redo}
                disabled={redoDisabled}
                icon={redoIcon}
            />
        </>
    )
}

export {UndoRedoControlsPanel}