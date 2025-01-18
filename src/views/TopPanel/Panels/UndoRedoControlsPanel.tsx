import {Button} from '../../../components/Button/Button.tsx';
import {redoIcon, undoIcon} from '../../../components/icons.ts';
import {useAppActions} from '../../../hooks/useAppAction.ts';
import classes from './UndoRedoControlsPanel.module.css'

type UndoRedoControlsPanelProps = {
    undoDisabled: boolean,
    redoDisabled: boolean,
}

const UndoRedoControlsPanel = ({
                                   undoDisabled, redoDisabled
                               }: UndoRedoControlsPanelProps) => {
    const {undo, redo} = useAppActions()

    return (
        <div className={classes.undoRedoControls}>
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
        </div>
    )
}

export {UndoRedoControlsPanel}