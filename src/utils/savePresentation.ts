import {PresentationType} from "../store/types.ts"

const savePresentation = (presentation: PresentationType, title: string) => {
    const jsonEditor = JSON.stringify(presentation)
    const file = new Blob([jsonEditor], {type: "application/json"})
    const a = document.createElement('a')
    a.href = URL.createObjectURL(file)
    const fileName = title || 'presentation'
    a.download = `${fileName}.json`
    a.click()
    URL.revokeObjectURL(a.href)
}

export {savePresentation}