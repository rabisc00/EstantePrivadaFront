import { BotoesPaginacao } from "../BotoesPaginacao/BotoesPaginacao";
import { LivrosTable } from "../LivrosTable/LivrosTable";
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
        carregando ? <img src="/imagens/spinner.svg" alt="Carregando" /> :
        naoEncontrado ? <h1>Não encontramos livros com esses parâmetros</h1> :
        fimPaginas ?
        <>
            <h1>Não temos mais páginas para esses parâmetros.</h1>
            <LivrosTable livros={[]} />
            <BotoesPaginacao 
                proximaPagina={proximaPagina}
                paginaAnterior={paginaAnterior}
                ultimaPagina={true}
            />
        </> : 
        livros.length > 0 &&
        <>
            <LivrosTable livros={livros} />
            <BotoesPaginacao 
                proximaPagina={proximaPagina}
                paginaAnterior={paginaAnterior}
                ultimaPagina={false}
                primeiraPagina={pagina === 1}
            />
        </>
    );
};