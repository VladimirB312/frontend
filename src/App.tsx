import {BrowserRouter, Route, Routes} from "react-router";
import EditorView from "./EditorView.tsx";
import PlayerView from "./PlayerView.tsx";

function App() {
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