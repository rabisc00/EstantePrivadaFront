import "./BotoesPaginacao.css";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";

export const BotoesPaginacao = ({livroSelecionado, salvarLivro, paginaAnterior, proximaPagina, ultimaPagina, primeiraPagina }) => {
    useEffect(() => {
        
    }, [livroSelecionado]);

    return (
        <div className="footer-livros-novos">
            <div className="div-paginacao">
                <Button variant="secondary" onClick={paginaAnterior} disabled={primeiraPagina}>Página anterior</Button>
                <Button variant="secondary" onClick={proximaPagina} disabled={ultimaPagina}>Próxima página</Button>
            </div>
            <div className="div-salvar-livro">
                <Button variant="success" onClick={salvarLivro} disabled={!livroSelecionado}>Salvar Livro</Button>
            </div>
        </div>
    );
}