import {PDFDocument, StandardFonts, rgb} from 'pdf-lib'
import {EditorType} from "./store/types.ts";
import {SLIDE_HEIGHT, SLIDE_WIDTH} from "./views/SlideContent/SlideContent.tsx";

export async function createPdf(editor: EditorType) {
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    editor.presentation.slides.map((slide) => {
        const page = pdfDoc.addPage([SLIDE_WIDTH, SLIDE_HEIGHT])
        console.log(page.getSize())
        slide.objects.map(async (el) => {
            if (el.type == 'text') {
                page.drawText(el.value, {
                    x: el.position.x,
                    y: SLIDE_HEIGHT - el.position.y - el.size.height,
                    size: el.textSize,
                    font: timesRomanFont,
                    color: rgb(0, 0.53, 0.71),
                })
            } else {
                const img = await pdfDoc.embedPng(el.src)
                page.drawImage(img, {
                    x: el.position.x,
                    y: SLIDE_HEIGHT - el.position.y - el.size.height,
                    width: el.size.width,
                    height: el.size.height,
                })
            }

        })
    })

    // const page = pdfDoc.addPage()
    // const {width, height} = page.getSize()
    // const fontSize = 30
    // page.drawText('Creating PDFs in JavaScript is awesome!', {
    //     x: 50,
    //     y: height - 4 * fontSize,
    //     size: fontSize,
    //     font: timesRomanFont,
    //     color: rgb(0, 0.53, 0.71),
    // })

    const pdfBytes = await pdfDoc.save()

    const pdfBlob = new Blob([pdfBytes], {type: 'application/pdf'})

    const a = document.createElement('a')
    a.href = URL.createObjectURL(pdfBlob)
    a.download = `pdf-lib_creation_example.pdf`
    a.click()
    URL.revokeObjectURL(a.href)
}