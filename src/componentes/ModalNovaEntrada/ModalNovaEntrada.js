import "./ModalNovaEntrada.css";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { URL_BASE } from "../..";

export const ModalNovaEntrada = ({ livroId, mostrarModal, setMostrarModal }) => {
    const [validated, setValidated] = useState(false);
    const [porcentagemDesabilitada, setPorcentagemDesabilitada] = useState(false);
    const [dataLeitura, setDataLeitura] = useState('');
    const [porcentagem, setPorcentagem] = useState(null);
    const [terminouLivro, setTerminouLivro] = useState(false);
    const [resenha, setResenha] = useState('');

    const onChangeTerminouLivro = () => {
        setTerminouLivro(!terminouLivro);
        setPorcentagemDesabilitada(!terminouLivro);
    };

    const fecharModal = () => {
        setMostrarModal(false);
        setValidated(false);
    };

    const criarEntrada = async () => {
        const urlPost = URL_BASE + "/entradas/" + livroId;

        await fetch(urlPost, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				resenha,
                porcentagem,
                terminouLivro,
                data: dataLeitura,
			})
		});

        window.location.reload();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            criarEntrada();
        }

        setValidated(true);
    }

    useEffect(() => {

    }, [mostrarModal]);

    return (
       <Modal show={mostrarModal} size="lg" onHide={fecharModal}>
            <Form id="form-nova-entrada" noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Nova Entrada</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Group controlId="validationCustom1">
                                <Form.Label>Data da Leitura</Form.Label>

                                <Form.Control required onChange={e => setDataLeitura(e.target.value)} type="date" />
                                <Form.Control.Feedback type="invalid">Data obrigatória</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="validationCustom2">
                                <Form.Label>Porcentagem</Form.Label>
                                <Form.Control required onChange={e => setPorcentagem(e.target.value)} min={0} max={100} disabled={porcentagemDesabilitada} type="number" />
                                <Form.Control.Feedback type="invalid">Número de 0 a 100</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Check onChange={onChangeTerminouLivro} label="Terminou o livro?" />
                        </Col>
                    </Row>

                    <Form.Group controlId="validationCustom3">
                        <Form.Label>Resenha</Form.Label>
                        <Form.Control onChange={e => setResenha(e.target.value)} as="textarea" rows={3} />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" variant="primary">
                        Criar
                    </Button>
                </Modal.Footer>
            </Form>
       </Modal>
    );
};