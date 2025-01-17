import Links from "./Links";
import home from "../../assets/home.png"; 
import homeInativo from "../../assets/homeInativo.png";
import novoVideo from "../../assets/novo-video.png"; 
import novoVideoInativo from "../../assets/novo-videoInativo.png"; 

function Navbar() {
    return (
        <nav>
            <Links to="/" activeIcon={home} inactiveIcon={homeInativo}>
                Home
            </Links>
            <Links to="/novo-video" activeIcon={novoVideo} inactiveIcon={novoVideoInativo}>
                Novo Vídeo
            </Links>
        </nav>
    );
}

export default Navbar;
