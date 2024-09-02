import { useEffect, useRef } from "react";
import "./ListagemLivrosNovos.css";

export const ListagemLivrosNovos = ({ cardsLivrosNovos, botoesPaginacao, livrosLength, buscarLivros, naoEncontrado, fimPaginas, carregando, pagina }) => {
    const firstRender = useRef(true);

    useEffect(() => {
        if (!firstRender.current) buscarLivros(pagina);
        else firstRender.current = false;
    }, [pagina, buscarLivros]);

    useEffect(() => {
        
    }, [carregando]);

    return (
        <div className="livros-novos-wrapper">
            {
                carregando ? 
                    <img src="/imagens/spinner.svg" alt="Carregando" /> :
                    naoEncontrado ?
                        <h1 className="mensagem-livro-novo">Não encontramos livros com esses parâmetros</h1> :
                        fimPaginas ?
                            <>
                                <h1 className="mensagem-livro-novo">Não temos mais páginas para esses parâmetros.</h1>
                                {botoesPaginacao}
                            </> : 
                            livrosLength > 0 ?
                            <>
                                {cardsLivrosNovos}
                                {botoesPaginacao}
                            </> :
                            <h1>Nenhum parâmetro enviado</h1>
                
            }
        </div>
    );
};