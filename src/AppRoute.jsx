import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App.jsx";
import NotFoundPage from "./pages/NotFound/index.jsx";
import CharacterPage from "./pages/Character/index.jsx";
import EpisodePage from "./pages/Episode/index.jsx";
import LocationPage from "./pages/Location/index.jsx";

function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path="/character/:id" element={ <CharacterPage /> } />
                <Route path="/episode/:id" element={ <EpisodePage /> } />
                <Route path="/location/:id" element={ <LocationPage /> } />

                <Route path="*" element={ <NotFoundPage />} /> {/* Sempre ficar no final */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute;