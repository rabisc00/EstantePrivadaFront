import "./FormularioLivroNovo.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
        <Form id="form-livro-novo">
            <Form.Group className="coluna-form-livro-novo">
                <Form.Label>Título</Form.Label>
                <Form.Control 
                    type="input" 
                    onChange={e => setTitulo(e.target.value)}
                    placeholder="Qual o título do livro?" 
                />
            </Form.Group>

            <Form.Group className="coluna-form-livro-novo">
                <Form.Label>Autor</Form.Label>
                <Form.Control 
                    type="input" 
                    onChange={e => setAutor(e.target.value)}
                    placeholder="Quem escreveu o livro?" 
                />
            </Form.Group>

            <Form.Group className="coluna-form-livro-novo">
                <Form.Label>Editora</Form.Label>
                <Form.Control 
                    type="input" 
                    onChange={e => setEditora(e.target.value)}
                    placeholder="Quem publicou o livro?" 
                />
            </Form.Group>

            <Form.Group className="coluna-form-livro-novo">
                <Form.Label>ISBN</Form.Label>
                <Form.Control 
                    type="input" 
                    onChange={e => setIsbn(e.target.value)}
                    placeholder="Qual o código do livro?" 
                />
            </Form.Group>

            <div className="coluna-form-livro-novo">
                <Button type="button" onClick={pesquisar}>
                    Pesquisar
                </Button>
            </div>
        </Form>
    );
};