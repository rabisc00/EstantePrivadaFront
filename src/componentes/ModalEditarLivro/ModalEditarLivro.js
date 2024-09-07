import "./ModalEditarLivro.css";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import URL_BASE from "../..";

export const ModalEditarLivro = ({ idLivro, mostrarModal, setMostrarModal }) => {
    const [carregando, setCarregando] = useState(false);
    const [detalhesLivro, setDetalhesLivro] = useState({
        id: null,
        titulo: '',
        subtitulo: '',
        autores: '',
        editora: '',
        isbn: '',
        anoPublicacao: null,
        idioma: '',
        imagem: ''
    });
    const [tituloUpdate, setTituloUpdate] = useState('');
    const [subtituloUpdate, setSubtituloUpdate] = useState('');
    const [autorUpdate, setAutorUpdate] = useState('');
    const [editoraUpdate, setEditoraUpdate] = useState('');
    const [isbnUpdate, setIsbnUpdate] = useState('');
    const [idiomaUpdate, setIdiomaUpdate] = useState('');
    const [imagemUpdate, setImagemUpdate] = useState('');
    const [anoUpdate, setAnoUpdate] = useState(0);

    const livroTitulo = detalhesLivro.titulo + (detalhesLivro.subtitulo != null ? ": " + detalhesLivro.subtitulo : ""); 

    const atualizar = async (e) => {
        e.preventDefault();

        const urlUpdate = URL_BASE + "/" + detalhesLivro.id;

        await fetch(urlUpdate, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				titulo: tituloUpdate,
                subtitulo: subtituloUpdate,
                autores: autorUpdate,
                editora: editoraUpdate,
                imagem: imagemUpdate,
                anoPublicacao: anoUpdate,
                idioma: idiomaUpdate,
                isbn: isbnUpdate
			})
		});

        window.location.reload();
    }

    useEffect(() => {
        const buscarDetalhes = async () => {
            setCarregando(true);

            const response = await fetch(URL_BASE + "/" + idLivro);
            const json = await response.json();

            setDetalhesLivro(json);
            setCarregando(false);
        }

        if (idLivro != null) buscarDetalhes();
    }, [idLivro, mostrarModal]);

    useEffect(() => {

    }, [carregando]);

    return (
        carregando ? 
            <Spinner animation="border" variant="primary" /> :
            <Modal show={mostrarModal} size="xl" onHide={() => setMostrarModal(false)}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>{livroTitulo}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form id="editar-livro-form">
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control 
                                        defaultValue={detalhesLivro.titulo} 
                                        onChange={e => setTituloUpdate(e.target.value)}
                                        type="text" 
                                        placeholder="Qual o título do livro?" 
                                        autoFocus 
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label>Subtítulo</Form.Label>
                                    <Form.Control 
                                        defaultValue={detalhesLivro.subtitulo} 
                                        onChange={e => setSubtituloUpdate(e.target.value)}
                                        type="text"
                                        placeholder="Qual o subtítulo do livro?" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Autor</Form.Label>
                                    <Form.Control 
                                        defaultValue={detalhesLivro.autores}
                                        onChange={e => setAutorUpdate(e.target.value)} 
                                        type="text" 
                                        placeholder="Quem escreveu o livro?" 
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label>Editora</Form.Label>
                                    <Form.Control 
                                        defaultValue={detalhesLivro.editora} 
                                        onChange={e => setEditoraUpdate(e.target.value)}
                                        type="text"
                                        placeholder="Quem publicou o livro?" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control 
                                        defaultValue={detalhesLivro.isbn} 
                                        onChange={e => setIsbnUpdate(e.target.value)}
                                        type="text" 
                                        placeholder="Qual o código do livro?" 
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={4}>
                                <Form.Group>
                                    <Form.Label>Idioma</Form.Label>
                                    <Form.Control 
                                        defaultValue={detalhesLivro.idioma} 
                                        onChange={e => setIdiomaUpdate(e.target.value)}
                                        type="text" 
                                        placeholder="Qual o idioma do livro?" 
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={2}>
                                <Form.Group>
                                    <Form.Label>Ano</Form.Label>
                                    <Form.Control 
                                        defaultValue={detalhesLivro.anoPublicacao} 
                                        onChange={e => setAnoUpdate(e.target.value)}
                                        type="number" 
                                        placeholder="Quando o livro foi publicado?" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Form.Group>
                                <Form.Label>Imagem</Form.Label>
                                <Form.Control 
                                    defaultValue={detalhesLivro.imagem} 
                                    onChange={e => setImagemUpdate(e.target.value)}
                                    type="text" 
                                    placeholder="Link da capa do livro" 
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">
                        Entradas
                    </Button>

                    <Button variant="danger">
                        Excluir
                    </Button>

                    <Button onClick={atualizar} variant="primary">
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};