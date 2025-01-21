import {jsPDF} from "jspdf"
import {PresentationType} from "../store/types.ts"
import {createGradient} from "./createGradient.ts"
import './fontsForJsPDF/arial-normal.js'
import './fontsForJsPDF/Verdana-normal.js'
import './fontsForJsPDF/Tahoma Regular-normal.js'
import './fontsForJsPDF/HelveticaRegular-normal.js'
import './fontsForJsPDF/timesnrcyrmt-normal.js'
import {SLIDE_HEIGHT, SLIDE_WIDTH} from "../constants/slideSize.ts"
import {getFont} from "./getFont.ts"
import {createImage} from "./createImage.ts"

const PDF_DOC_WIDTH = SLIDE_WIDTH
const PDF_DOC_HEIGHT = SLIDE_HEIGHT

const exportToPdf = async (presentation: PresentationType) => {
    const presentationTitle = presentation.title
    const slides = presentation.slides
    const scale = PDF_DOC_WIDTH / SLIDE_WIDTH

    const doc = new jsPDF({
        orientation: "l",
        unit: "px",
        format: [PDF_DOC_WIDTH, PDF_DOC_HEIGHT],
        hotfixes: ['px_scaling'],
    })

    for (const[index, slide] of slides.entries()) {
        if (slide.background.type == 'solid') {
            doc.setFillColor(slide.background.color)
            doc.rect(0, 0, PDF_DOC_WIDTH, PDF_DOC_HEIGHT, 'F')
        }
        if (slide.background.type == 'image') {
            doc.addImage(slide.background.src, 0, 0, PDF_DOC_WIDTH, PDF_DOC_HEIGHT, '', 'FAST')
        }
        if (slide.background.type == 'gradient') {
            const gradientImage = createGradient(PDF_DOC_WIDTH, PDF_DOC_HEIGHT, slide.background)
            if (gradientImage) {
                doc.addImage(gradientImage, 0, 0, PDF_DOC_WIDTH, PDF_DOC_HEIGHT, '', 'FAST')
            }
        }

        for (const element of slide.objects) {
            if (element.type == 'text') {
                const {value, position, size, align, textSize, font} = element
                doc.setFontSize(textSize * scale * doc.internal.scaleFactor)
                doc.setFont(getFont(font))

                let xPos = position.x * scale
                if (align === 'center') {
                    xPos = position.x * scale + size.width / 2
                } else if (align === 'right') {
                    xPos = position.x * scale + size.width
                }

                doc.text(value, xPos, position.y * scale, { align: align, baseline: 'top' })
            }
            if (element.type == 'image') {
                try {
                    const base64Image = await createImage(element)
                    if (base64Image) {
                        doc.addImage(base64Image, element.position.x * scale, element.position.y * scale, element.size.width * scale, element.size.height * scale, '', 'FAST')
                    } else {
                        console.error('Не удалось создать изображение')
                    }
                } catch (error) {
                    console.error('Ошибка при создании изображения:', error)
                }
            }
        }

        if (index != slides.length - 1) {
            doc.addPage()
        }
    }

    doc.save(presentationTitle)
}

export {exportToPdf}