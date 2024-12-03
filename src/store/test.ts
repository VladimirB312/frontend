// import {
//     addElement,
//     addSlide,
//     changeElementPosition,
//     changeElementSize,
//     changeSlidePosition,
//     changeTextFont,
//     changeTextSize,
//     changeTextValue,
//     ImageElement,
//     PresentationType,
//     removeElement,
//     removeSlide,
//     renamePresentationTitle,
//     setBackgroundColor,
//     setBackgroundImage,
//     SlideType
// } from './objects.ts'
//
// export const minDataPresentation: PresentationType = {
//     title: "min data presentation",
//     slides: []
// }
//
// export const maxDataPresentation: PresentationType = {
//     title: "max data presentation",
//     slides: [
//         {
//             id: "1",
//             background: {
//                 color: "green",
//                 type: "solid"
//             },
//             objects: [
//                 {
//                     id: '1',
//                     position: {x: 40, y: 40},
//                     size: {width: 200, height: 200},
//                     type: "text",
//                     value: "max data presentation title",
//                     textSize: 30,
//                     font: "sans-serif"
//                 },
//                 {
//                     id: "2",
//                     position: {x: 160, y: 160},
//                     size: {width: 150, height: 150},
//                     type: "image",
//                     src: "./src/assets/image1.png"
//                 },
//             ]
//         },
//         {
//             id: "2",
//             background: {
//                 src: "./src/assets/testBackground.jpg",
//                 type: "image"
//             },
//             objects: [
//                 {
//                     id: "1",
//                     position: {x: 50, y: 150},
//                     size: {width: 200, height: 50},
//                     type: "text",
//                     value: "Max data presentation title",
//                     textSize: 20,
//                     font: "sans-serif"
//                 },
//                 {
//                     id: "2",
//                     position: {x: 150, y: 150},
//                     size: {width: 150, height: 150},
//                     type: "image",
//                     src: "./src/assets/testImage.png"
//                 },
//             ]
//         }
//     ]
// }
//
// const testPresentation = (presentation: PresentationType) => {
//     console.log("title before rename = ", presentation.title);
//     presentation = renamePresentationTitle(presentation, "New presentation title");
//     console.log("title after rename = ", presentation.title);
//
//     console.log("slides before removeSlide = ", presentation.slides);
//     presentation = removeSlide(presentation, "1");
//     console.log("slides after removeSlide = ", presentation.slides);
//
//     console.log("slides before addSlide = ", presentation.slides);
//     const newSlide: SlideType = {
//         id: "3",
//         background: {
//             color: "black",
//             type: "solid"
//         },
//         objects: [
//             {
//                 id: "8",
//                 position: {x: 15, y: 15},
//                 size: {width: 25, height: 25},
//                 type: "text",
//                 value: "test presentation text",
//                 textSize: 25,
//                 font: "sans-serif"
//             },
//             {
//                 id: "12",
//                 position: {x: 12, y: 12},
//                 size: {width: 52, height: 52},
//                 type: "image",
//                 src: "./objectsImages/image1.png"
//             },
//         ]
//     }
//     presentation = addSlide(presentation, newSlide);
//     console.log("slides after addSlide = ", presentation.slides);
//
//     console.log("slides before changeSlidePosition = ", presentation.slides);
//     presentation = changeSlidePosition(presentation, "1", 2);
//     console.log("slides after changeSlidePosition = ", presentation.slides);
//
//     console.log("elements before addElement = ", presentation.slides.find(slide => slide.id === "2"));
//     const newElement: ImageElement = {
//         id: "5",
//         position: {x: 10, y: 10},
//         size: {width: 50, height: 50},
//         type: "image",
//         src: "./objectsImages/newImage.png"
//     }
//     presentation = addElement(presentation, "2", newElement);
//     console.log("elements after addElement = ", presentation.slides.find(slide => slide.id === "2"));
//
//     console.log("elements before removeElement = ", presentation.slides.find(slide => slide.id === "2"));
//     presentation = removeElement(presentation, "2", "2");
//     console.log("elements after removeElement = ", presentation.slides.find(slide => slide.id === "2"));
//
//
//     console.log("elements before changeElementPosition = ", presentation.slides.find(slide => slide.id === "2"));
//     presentation = changeElementPosition(presentation, "2", "2", {x: 100, y: 100});
//     console.log("elements after changeElementPosition = ", presentation.slides.find(slide => slide.id === "2"));
//
//     console.log("elements before changeElementSize = ", presentation.slides.find(slide => slide.id === "2"));
//     presentation = changeElementSize(presentation, "2", "2", {width: 150, height: 150});
//     console.log("elements after changeElementSize = ", presentation.slides.find(slide => slide.id === "2"));
//
//     console.log("elements before changeTextValue = ", presentation.slides.find(slide => slide.id === "2"));
//     presentation = changeTextValue(presentation, "2", "2", "New text value");
//     console.log("elements after changeTextValue = ", presentation.slides.find(slide => slide.id === "2"));
//
//     console.log("elements before changeTextSize = ", presentation.slides.find(slide => slide.id === "2"));
//     presentation = changeTextSize(presentation, "2", "2", 27);
//     console.log("elements after changeTextSize = ", presentation.slides.find(slide => slide.id === "2"));
//
//     console.log("elements before changeTextFont = ", presentation.slides.find(slide => slide.id === "2"));
//     presentation = changeTextFont(presentation, "2", "2", "georgia");
//     console.log("elements after changeTextFont = ", presentation.slides.find(slide => slide.id === "2"));
//
//     console.log("slides before setBackgroundImage = ", presentation.slides);
//     presentation = setBackgroundImage(presentation, "1", "./images/newImage.png");
//     console.log("slides after setBackgroundImage = ", presentation.slides);
//
//
//     console.log("slides before setBackground = ", presentation.slides);
//     presentation = setBackgroundColor(presentation, "1", "red");
//     console.log("slides after setBackground = ", presentation.slides);
// }
//
// testPresentation(minDataPresentation);
// testPresentation(maxDataPresentation);