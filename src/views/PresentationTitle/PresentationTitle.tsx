import classes from './PresentationTitle.module.css'

type TitleProps = {
    title: string
}

function PresentationTitle(props: TitleProps) {
    return (
        <div className={classes.title}>
            {props.title}
        </div>
    )
}

export default PresentationTitle