import {ARIAL, HELVETICA, TAHOMA, TIMES_NEW_ROMAN, VERDANA} from "../constants/fonts.ts"

const getFont = (font: string) => {
    switch (font) {
        case ARIAL:
            return 'arial'
        case TAHOMA:
            return 'Tahoma Regular'
        case VERDANA:
            return 'Verdana'
        case HELVETICA:
            return 'HelveticaRegular'
        case TIMES_NEW_ROMAN:
            return 'timesnrcyrmt'
        default:
            return 'arial'
    }
}

export {getFont}