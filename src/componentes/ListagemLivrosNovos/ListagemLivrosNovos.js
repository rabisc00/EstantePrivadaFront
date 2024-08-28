import BotoesPaginacao from "../BotoesPaginacao";
import CardsLivrosNovos from "../CardsLivrosNovos";
import { useEffect, useRef } from "react";
import "./ListagemLivrosNovos.css";

export const ListagemLivrosNovos = ({ livros, buscarLivros, naoEncontrado, fimPaginas, carregando, pagina, proximaPagina, paginaAnterior }) => {
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
                                <BotoesPaginacao 
                                    proximaPagina={proximaPagina}
                                    paginaAnterior={paginaAnterior}
                                    ultimaPagina={true}
                                />
                            </> : 
                            livros.length > 0 ?
                            <>
                                <CardsLivrosNovos livros={livros} />
                                <BotoesPaginacao 
                                    proximaPagina={proximaPagina}
                                    paginaAnterior={paginaAnterior}
                                    ultimaPagina={livros.length < 10}
                                    primeiraPagina={pagina === 1}
                                />
                            </> :
                            <h1>Nenhum parâmetro enviado</h1>
                
            }
        </div>
    );
};