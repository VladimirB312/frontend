import {BrowserRouter, Route, Routes} from "react-router"
import {EditorView} from "./views/EditorView/EditorView.tsx"
import {PlayerView} from "./views/PlayerView/PlayerView.tsx"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<EditorView />} />
                <Route path="player" element={<PlayerView />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App