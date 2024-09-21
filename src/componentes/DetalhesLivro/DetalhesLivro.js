import "./DetalhesLivro.css";
import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { URL_BASE, IMAGE_DEFAULT } from "../..";

export const DetalhesLivro = ({ livroId }) => {
    const [livro, setLivro] = useState({
        id: null,
        titulo: '',
        subtitulo: '',
        autores: '',
        editora: '',
        isbn: '',
        anoPublicacao: null,
        idioma: '',
        imagem: ''
    });
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const buscarDetalhes = async () => {
            setCarregando(true);

            const response = await fetch(URL_BASE + "/" + livroId);
            const json = await response.json();

            setLivro(json);
            setCarregando(false);
        };

        buscarDetalhes();
    }, [livroId]);

    return (
        <div className="bg-secondary-subtle">
            <div className="container">
                {
                    carregando ?
                    <Spinner animation="border" variant="primary" /> :
                    <div className="detalhes-livro">
                        <div>
                            <img 
                                className="meu-livro-imagem" 
                                src={livro.imagem != null ? livro.imagem : IMAGE_DEFAULT} 
                                alt={livro.titulo} 
                            />
                        </div>
                        <div className="detalhes-livro-info">
                            <h5>{livro.titulo + (livro.subtitulo != null ? ": " + livro.subtitulo : "")}</h5>
        
                            <h6>{
                                livro.autores != null && livro.editora != null ? 
                                livro.autores + " | " + livro.editora : livro.autores != null && livro.editora == null ? 
                                livro.autores : livro.autores == null && livro.editora != null ? 
                                livro.editora : ""
                            }</h6>
        
                            {livro.isbn && <p>ISBN: {livro.isbn}</p>}
        
                            <div className="tags-row">
                                {livro.anoPublicacao && <span className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-2">{livro.anoPublicacao}</span>}
                                {livro.idioma && <span className="text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-2">{livro.idioma}</span>}
                            </div>
                        </div>
                    </div>
                }
            </div>  
        </div>
    );
};