import "./MeusLivros.css";
import LivrosNavbar from "../../componentes/LivrosNavbar";
import ListagemMeusLivros from "../../componentes/ListagemMeusLivros";
import { useEffect, useState } from "react";

const URL_BASE = "http://localhost:8080/livros";

export const MeusLivros = () => {
    const [carregando, setCarregando] = useState(false);
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        const buscarLivros = async () => {
            setCarregando(true);
    
            const response = await fetch(URL_BASE);
            const json = await response.json();
    
            setLivros(json);
            setCarregando(false);
        };

        buscarLivros();
    }, []);

    return (
        <>
            <LivrosNavbar />
            <div className="container" id="meus-livros">
                <ListagemMeusLivros
                    livros={livros}
                    carregando={carregando}
                />
            </div>
        </>
    );
};