import {jsPDF} from "jspdf";
import {PresentationType} from "../store/types.ts";
import {SLIDE_HEIGHT, SLIDE_WIDTH} from "../views/SlideContent/SlideContent.tsx";

const PDF_DOC_WIDTH = SLIDE_WIDTH
const PDF_DOC_HEIGHT = SLIDE_HEIGHT

const exportToPdf = (presentation: PresentationType) => {
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
        }
        if (slide.background.type == 'image') {
            doc.addImage(slide.background.src, 0, 0, PDF_DOC_WIDTH, PDF_DOC_HEIGHT, '', 'FAST')
        }
        // if (slide.background.type == 'gradient') {
        //     const gradientImage = createGradient(PDF_DOC_WIDTH, PDF_DOC_HEIGHT)
        //     if (gradientImage) {
        //         doc.addImage(gradientImage, 0, 0, PDF_DOC_WIDTH, PDF_DOC_HEIGHT, '', 'FAST')
        //     }
        // }

        slide.objects.map((element) => {
            if (element.type == 'text') {
                doc.setFontSize(element.textSize * scale * doc.internal.scaleFactor)
                doc.text(element.value, element.position.x * scale, element.position.y * scale, {baseline: 'top'}
                )
            }
            if (element.type == 'image') {
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

export {exportToPdf}