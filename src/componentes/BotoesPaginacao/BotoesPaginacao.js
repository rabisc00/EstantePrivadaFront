import "./BotoesPaginacao.css";

export const BotoesPaginacao = ({paginaAnterior, proximaPagina, ultimaPagina, primeiraPagina }) => {
    return (
        <>
            <button onClick={paginaAnterior} disabled={primeiraPagina}>Página anterior</button>
            <button onClick={proximaPagina} disabled={ultimaPagina}>Próxima página</button>
        </>
    );
}