import "./BotoesPaginacao.css";
import Button from "react-bootstrap/Button";

export const BotoesPaginacao = ({paginaAnterior, proximaPagina, ultimaPagina, primeiraPagina }) => {
    return (
        <div className="botoes-paginacao">
            <Button variant="secondary" onClick={paginaAnterior} disabled={primeiraPagina}>Página anterior</Button>
            <Button variant="secondary" onClick={proximaPagina} disabled={ultimaPagina}>Próxima página</Button>
        </div>
    );
}