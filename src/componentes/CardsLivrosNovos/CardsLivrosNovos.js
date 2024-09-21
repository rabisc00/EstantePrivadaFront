import "./CardsLivrosNovos.css";
import { IMAGE_DEFAULT } from "../..";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

export const CardsLivrosNovos = ({ livros, setLivroSelecionado, setLivroSelecionadoId }) => {
    const [dictAtivos, setDictAtivos] = useState({});

    const setSelecionado = (id, selecionado) => {
        const novoDict = {};

        const dictKeys = Object.keys(dictAtivos);
        dictKeys.forEach(k => {
            if (k === id) novoDict[k] = selecionado;
            else novoDict[k] = false;
        });

        setLivroSelecionadoId(selecionado ? id : "");
        setLivroSelecionado(selecionado);
        setDictAtivos(novoDict);
    };

    useEffect(() => {
        const dictFinal = {};
        for (let i = 0; i < livros.length; i++) {
            dictFinal[livros[i].id] = false;
        }

        setDictAtivos(dictFinal);
    }, [livros]);

    return (
        <div className="todos-livros-novos">
            {livros.map((l) => {
                    const selecionado = dictAtivos[l.id];
                    const cardTitulo = l.titulo + (l.subtitulo != null ? ": " + l.subtitulo : "");
                    const cardSubtitulo = l.autor != null && l.editora != null ? 
                        l.autor + " | " + l.editora : l.autor != null && l.editora == null ? 
                        l.autor : l.autor == null && l.editora != null ? 
                        l.editora : null;
                    const cardClass = "livro-novo " + (selecionado ? "border-primary border-3" : "");
                
                    const clickCard = (id) => {
                        if (selecionado) setSelecionado(id, false);
                        else setSelecionado(id, true);
                    };

                    return (
                        <Card key={l.id} className={cardClass} onClick={() => clickCard(l.id)}>
                            <Card.Body>
                                <img src={l.imagem != null ? l.imagem : IMAGE_DEFAULT} alt={l.titulo} />
                                <div className="livro-novo-info1">
                                    <Card.Title>{cardTitulo}</Card.Title>
                                    {cardSubtitulo && <Card.Subtitle>{cardSubtitulo}</Card.Subtitle>}
                                </div>
                            </Card.Body>

                            <Card.Footer>
                                {l.isbn && <p className="livro-novo-isbn">ISBN: {l.isbn}</p>}
                                <div className="tags-row">
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