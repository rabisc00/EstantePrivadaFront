import "./LogsLivro.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import LivrosNavbar from "../../componentes/LivrosNavbar";
import DetalhesLivro from "../../componentes/DetalhesLivro";
import ListagemEntradas from "../../componentes/ListagemEntradas";
import ModalNovaEntrada from "../../componentes/ModalNovaEntrada";

export const LogsLivro = () => {
    const { livroId } = useParams();
    const [mostrarModal, setMostrarModal] = useState(false);

    return (
        <>
            <LivrosNavbar />
            <DetalhesLivro livroId={livroId} />
            <ListagemEntradas livroId={livroId} setMostrarModal={setMostrarModal} />
            <ModalNovaEntrada livroId={livroId} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} />
        </>
    );
};