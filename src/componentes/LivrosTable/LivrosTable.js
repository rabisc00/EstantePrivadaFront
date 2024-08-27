import "./LivrosTable.css";
import Card from "react-bootstrap/Card";

const IMAGE_DEFAULT = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSidQoav1MLzs-vLXRgx7f4S-16yT0D4YB2A&s";

export const LivrosTable = ({ livros }) => {
    return (
        <div className="todos-livros-novos">
            {livros.map((l, i) => {
                const cardTitulo = l.titulo + (l.subtitulo != null ? ": " + l.subtitulo : "");
                const cardSubtitulo = l.autor != null && l.editora != null ? 
                    l.autor + " | " + l.editora : l.autor != null && l.editora == null ? 
                    l.autor : l.autor == null && l.editora != null ? 
                    l.editora : null;

                return (
                    <Card key={l.id} className="livro-novo">
                        <Card.Body>
                            <img src={l.imagem != null ? l.imagem : IMAGE_DEFAULT} alt={l.titulo} />
                            <div className="livro-novo-info1">
                                <Card.Title>{cardTitulo}</Card.Title>
                                {cardSubtitulo && <Card.Subtitle>{cardSubtitulo}</Card.Subtitle>}
                            </div>
                        </Card.Body>

                        <Card.Footer>
                            <p>ISBN: {l.isbn}</p>
                            <div className="livro-novo-tags">
                                {l.anoLancamento && <span className="text-success-emphasis bg-success-subtle border border-success-subtle rounded-2">{l.anoLancamento}</span>}
                                {l.idioma && <span className="text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-2">{l.idioma}</span>}
                            </div>
                        </Card.Footer>
                    </Card>
                );
            })}
        </div>
    );
}