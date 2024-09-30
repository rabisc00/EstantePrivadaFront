import "./MeusLivros.css";
import LivrosNavbar from "../../componentes/LivrosNavbar";
import ListagemMeusLivros from "../../componentes/ListagemMeusLivros";
import ModalEditarLivro from "../../componentes/ModalEditarLivro";
import { URL_BASE } from "../..";
import { useEffect, useState } from "react";


export const MeusLivros = () => {
    const [carregando, setCarregando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [idLivroSelecionado, setIdLivroSelecionado] = useState(null);
    const [livros, setLivros] = useState([]);

    const selecionarLivro = (id) => {
        setIdLivroSelecionado(id);
        setMostrarModal(true);
    };

    useEffect(() => {
        const buscarLivros = async () => {
            setCarregando(true);
    
            const response = await fetch(URL_BASE + "/livros");
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
                    selecionarLivro={selecionarLivro}
                />
                <ModalEditarLivro
                    idLivro={idLivroSelecionado}
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                />
            </div>
        </>
    );
};