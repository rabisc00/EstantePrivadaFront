import "./FormularioLivroNovo.css";
import InputTexto from "../InputTexto";
import Botao from "../Botao";
import { useState } from "react";

export const FormularioLivroNovo = (props) => {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [editora, setEditora] = useState('');
    const [isbn, setIsbn] = useState('');

    const pesquisar = async (e) => {
        e.preventDefault();

        props.aoPesquisar({
            titulo,
            autor,
            editora,
            isbn
        });
    };

    return (
        <section className="section-livro-novo">
            <form onSubmit={pesquisar} className="formulario-livro-novo">
                <div className="livro-novo-campo">
                    <InputTexto
                        label="Título"
                        placeholder="Qual o título do livro?"
                        valor={titulo}
                        aoAlterar={valor => setTitulo(valor)}
                    />
                </div>
                
                <div className="livro-novo-campo">
                    <InputTexto
                        label="Autor"
                        placeholder="Quem escreveu o livro?"
                        valor={autor}
                        aoAlterar={valor => setAutor(valor)}
                    />
                </div>

                <div className="livro-novo-campo">
                    <InputTexto
                        label="Editora"
                        placeholder="Quem publicou o livro?"
                        valor={editora}
                        aoAlterar={valor => setEditora(valor)}
                    />
                </div>

                <div className="livro-novo-campo">
                    <InputTexto
                        label="ISBN"
                        placeholder="Qual o código do livro?"
                        valor={isbn}
                        aoAlterar={valor => setIsbn(valor)}
                    />
                </div>
                
                <div className="livro-novo-campo">
                    <Botao>
                        Pesquisar
                    </Botao>
                </div>
            </form>
        </section>
    );
};