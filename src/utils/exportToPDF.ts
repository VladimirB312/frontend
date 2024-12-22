import {jsPDF} from "jspdf";
import {EditorType} from "../store/types.ts";
import {SLIDE_HEIGHT, SLIDE_WIDTH} from "../views/SlideContent/SlideContent.tsx";

const PDF_DOC_WIDTH = SLIDE_WIDTH
const PDF_DOC_HEIGHT = SLIDE_HEIGHT

export function exportToPdf(editor: EditorType) {
    const presentation = editor.presentation
    const presentationTitle = presentation.title
    const slides = presentation.slides
    const scale = PDF_DOC_WIDTH / SLIDE_WIDTH

    const doc = new jsPDF({
        orientation: "l",
        unit: "px",
        format: [PDF_DOC_WIDTH, PDF_DOC_HEIGHT],
        hotfixes: ['px_scaling'],
    });

    slides.map((slide, index, arr) => {
        if (slide.background.type == 'solid') {
            doc.setFillColor(slide.background.color)
            doc.rect(0, 0, PDF_DOC_WIDTH, PDF_DOC_HEIGHT, 'F')
        } else {
            doc.addImage(slide.background.src, 0, 0, PDF_DOC_WIDTH, PDF_DOC_HEIGHT, '', 'FAST')
        }

        slide.objects.map((element) => {
            if (element.type == 'text') {
                doc.setFontSize(element.textSize * scale * doc.internal.scaleFactor)
                doc.text(element.value, element.position.x * scale, element.position.y * scale, {baseline: 'top'}
                )
            } else {
                doc.addImage(
                    element.src, element.position.x * scale, element.position.y * scale, element.size.width * scale, element.size.height * scale, '', 'FAST'
                )
            }
        })

        if (index != arr.length - 1) {
            doc.addPage()
        }
    })

    doc.save(presentationTitle);
}