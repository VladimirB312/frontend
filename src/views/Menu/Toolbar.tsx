import classes from './Toolbar.module.css'
import {ToolbarItem} from "../../store/objects.ts";

type MenuProps = {
    toolbar: Array<ToolbarItem>
}

function Toolbar({toolbar}: MenuProps) {
    return (

        <div className={classes['toolbar']}>
            {toolbar.map(item => {
                return (
                    <button key={item.id} className={classes['toolbar__button']}>{item.text}</button>
                )
            })}
        </div>
    )
}

export default Toolbar