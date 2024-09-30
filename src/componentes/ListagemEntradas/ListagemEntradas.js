import "./ListagemEntradas.css";
import { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { URL_BASE } from "../..";

export const ListagemEntradas = ({ livroId, setMostrarModal }) => {
    const [carregando, setCarregando] = useState(false);
    const [entradas, setEntradas] = useState([]);

    useEffect(() => {
        const buscarEntradas = async () => {
            setCarregando(true);

            const response = await fetch(URL_BASE + "/entradas/" + livroId);
            const json = await response.json();

            const entradasEmOrdem = [];

            json.forEach((e) => {
                if (!entradasEmOrdem[e.vezLendo - 1]) entradasEmOrdem.push([]);
                entradasEmOrdem[e.vezLendo - 1].push(e);
            });

            setEntradas(entradasEmOrdem);
            setCarregando(false);
        };

        buscarEntradas();
    }, [livroId]);

    return (
        <div className="container" >
            {
                carregando ?
                    <Spinner animation="border" variant="primary" /> :
                    <section id="entradas-livro">
                        {
                            entradas.length > 0 ?
                                entradas.map((grupoEntradas, index) => {
                                    return (
                                        <div className="grupo-entradas" key={index}>
                                            <ul className="lista-grupo-entradas">
                                                {grupoEntradas.map((e, index) => {
                                                    return (
                                                        <li className="entrada" key={index}>
                                                            <div className="entrada-info">
                                                                <p className="text-secondary">{e.data} -</p>
                                                                {e.terminouLivro ?
                                                                    <p className="text-secondary">Sessão Finalizada</p> :
                                                                    <ProgressBar now={e.porcentagem} label={e.porcentagem + "%"} />
                                                                }
                                                            </div>
                                                            <p className="entrada-resenha">{e.resenha}</p>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )
                                }) :
                                <h1>Ainda não foram adicionadas entradas para este livro</h1>
                        }

                        <div id="button-nova-entrada-container">
                            <Button onClick={() => setMostrarModal(true)} className="mt-4" variant="primary">
                                Nova Entrada
                            </Button>
                        </div>
                    </section>
            }
        </div>
    );
};