import { useEffect } from "react";
import "./ListagemMeusLivros.css";
import Spinner from 'react-bootstrap/Spinner';
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { IMAGE_DEFAULT } from "../..";

export const ListagemMeusLivros = ({ livros, carregando, selecionarLivro }) => {
    useEffect(() => {

    }, [livros, carregando]);

    return (
        <>
            {
            carregando ? 
                <Spinner animation="border" variant="primary" /> :
                livros.length > 0 ?
                    livros.map(l => {
                        const cardTitulo = l.titulo + (l.subtitulo != null ? ": " + l.subtitulo : "");
                        const autores = l.autores || "";
                        const editora = l.editora == null ? "" : l.autores != null ? " | " + l.editora : l.editora;
                        const ano = l.anoPublicacao == null ? "" : l.autores != null || l.editora != null ? " | " + l.anoPublicacao : l.anoPublicacao;


                        const popover = (
                            <Popover id="popover-basic">
                                <Popover.Header as="h3">{cardTitulo}</Popover.Header>
                                <Popover.Body>
                                    {autores + editora + ano}
                                </Popover.Body>
                            </Popover>
                        );

                        return (
                            <OverlayTrigger key={l.id} trigger="hover" placement="right" overlay={popover}>
                                <img 
                                    className="meu-livro-imagem" 
                                    onClick={() => selecionarLivro(l.id)}
                                    src={l.imagem != null ? l.imagem : IMAGE_DEFAULT} 
                                    alt={l.titulo} />
                            </OverlayTrigger>
                        );
                    }) :
                    <h1 className="mensagem-livro-novo">Você ainda não adicionou nenhum livro.</h1>
            }
        </>
    );
};