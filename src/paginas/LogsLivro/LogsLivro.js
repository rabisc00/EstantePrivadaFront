import "./LogsLivro.css";
import { useParams } from "react-router-dom";
import LivrosNavbar from "../../componentes/LivrosNavbar";
import DetalhesLivro from "../../componentes/DetalhesLivro";

export const LogsLivro = () => {
    const { livroId } = useParams();

    return (
        <>
            <LivrosNavbar />
            <DetalhesLivro livroId={livroId} />
        </>
    );
};