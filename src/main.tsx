import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import {store} from "./store/redux/store.ts";
import App from "./App.tsx";


const root = createRoot(document.getElementById('root')!);

function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>,
    )
}
render();
