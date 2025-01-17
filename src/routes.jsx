import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Cabecalho from "./components/Cabecalho";
import NovoVideo from "./pages/NovoVideo";
import Footer from "./components/Footer";


function AppRoutes () {
    return (
        <BrowserRouter>
            <Cabecalho />
            
                <Routes>
                    <Route path="/" element={<Inicio/>}></Route>
                    <Route path="/novo-video" element={<NovoVideo/>}></Route>
                    <Route path="*" element={<h1>Ops! Página não encontrada</h1>}></Route>
                </Routes>

            <Footer />
        </BrowserRouter>
    )
}

export default AppRoutes;