import "./CardLivroNovo.css";
import Card from "react-bootstrap/Card";

const IMAGE_DEFAULT = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSidQoav1MLzs-vLXRgx7f4S-16yT0D4YB2A&s";

export const CardLivroNovo = ({ livro, selecionado, setSelecionado }) => {
    const cardTitulo = livro.titulo + (livro.subtitulo != null ? ": " + livro.subtitulo : "");
    const cardSubtitulo = livro.autor != null && livro.editora != null ? 
        livro.autor + " | " + livro.editora : livro.autor != null && livro.editora == null ? 
        livro.autor : livro.autor == null && livro.editora != null ? 
        livro.editora : null;
    const cardClass = "livro-novo " + (selecionado ? "border-primary border-3" : "");

    const clickCard = (id) => {
        if (selecionado) setSelecionado(id, false);
        else setSelecionado(id, true);
    }

    return (
        <Card key={livro.id} className={cardClass} onClick={() => clickCard(livro.id)}>
            <Card.Body>
                <img src={livro.imagem != null ? livro.imagem : IMAGE_DEFAULT} alt={livro.titulo} />
                <div className="livro-novo-info1">
                    <Card.Title>{cardTitulo}</Card.Title>
                    {cardSubtitulo && <Card.Subtitle>{cardSubtitulo}</Card.Subtitle>}
                </div>
            </Card.Body>

            <Card.Footer>
                {livro.isbn && <p className="livro-novo-isbn">ISBN: {livro.isbn}</p>}
                <div className="livro-novo-tags">
                    {livro.anoLancamento && <span className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-2">{livro.anoLancamento}</span>}
                    {livro.idioma && <span className="text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-2">{livro.idioma}</span>}
                </div>
            </Card.Footer>
        </Card>
    );
}