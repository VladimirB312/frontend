import * as SlideActionCreators from './slideActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as EditorActionCreators from './editorActionCreators'
import * as PresentationActionCreators from './presentationActionCreators'
import * as ElementActionCreators from './elementActionCreators.ts'
import * as UnsplashActionsCreators from '../thunk/unsplashFunctionsThunk.ts'

export default {
    ...PresentationActionCreators,
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...ElementActionCreators,
    ...EditorActionCreators,
    ...UnsplashActionsCreators,
}