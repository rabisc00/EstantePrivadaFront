import "./NovosLivros.css";
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_BASE } from "../..";
import FormularioLivroNovo from "../../componentes/FormularioLivroNovo";
import ListagemLivrosNovos from "../../componentes/ListagemLivrosNovos";
import CardsLivrosNovos from "../../componentes/CardsLivrosNovos";
import BotoesPaginacao from "../../componentes/BotoesPaginacao";
import LivrosNavbar from "../../componentes/LivrosNavbar";

export const NovosLivros = () => {
	const navigate = useNavigate();

    const [livroPesquisa, setLivroPesquisa] = useState({
		titulo: '',
		autor: '',
		editora: '', 
		isbn: ''
	});
	const [livros, setLivros] = useState([]);
	const [livroSelecionadoId, setLivroSelecionadoId] = useState("");
	const [naoEncontrado, setNaoEncontrado] = useState(false);
	const [fimPaginas, setFimPaginas] = useState(false);
	const [pagina, setPagina] = useState(1);
	const [carregando, setCarregando] = useState(false);
	const [livroSelecionado, setLivroSelecionado] = useState(false);

	const firstRender = useRef(true);

	const aoPesquisar = (p) => {
		setLivroPesquisa(p);
		setPagina(1);
	};

    const buscarLivros = useCallback(async (pagina) => {
		setCarregando(true);
        const url = URL_BASE + "/livros/pesquisar?titulo=" + livroPesquisa.titulo + "&autor=" + livroPesquisa.autor + 
            "&editora=" + livroPesquisa.editora + "&isbn=" + livroPesquisa.isbn + "&pagina=" + pagina;

		const response = await fetch(url.replaceAll(" ", "+"));

		try {
			const json = await response.json();

			setLivros(json);
			setFimPaginas(false);
			setNaoEncontrado(false);
		} catch (ex) {
			if (pagina > 1) setFimPaginas(true);
			else setNaoEncontrado(true);
		}

		setCarregando(false);
		
    }, [livroPesquisa]);

	const salvarLivro = async () => {
		await fetch(URL_BASE + "/livros", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: livroSelecionadoId
			})
		});

		navigate("/");
	};

	const proximaPagina = () => {
        setPagina((atual) => atual + 1);
		setLivroSelecionado(false);
    };

    const paginaAnterior = () => {
        setPagina((atual) => atual - 1);
		setLivroSelecionado(false);
    };

	const cardsLivrosNovos = (
		<CardsLivrosNovos 
			livros={livros} 
			setLivroSelecionado={setLivroSelecionado}
			setLivroSelecionadoId={setLivroSelecionadoId}
		/>
	);

	const botoesPaginacao = (
		<BotoesPaginacao 
			livroSelecionado={livroSelecionado}
			salvarLivro={salvarLivro}
			proximaPagina={proximaPagina}
			paginaAnterior={paginaAnterior}
			ultimaPagina={livros.length < 10}
			primeiraPagina={pagina === 1}
		/>
	);

	useEffect(() => {
		if (!firstRender.current) {
			buscarLivros(1);
		}
		else firstRender.current = false;
	}, [buscarLivros]);

  	return (
		<>
			<LivrosNavbar />
			<div className="container">
				<FormularioLivroNovo aoPesquisar={aoPesquisar} />
				<ListagemLivrosNovos 
					cardsLivrosNovos={cardsLivrosNovos}
					botoesPaginacao={botoesPaginacao}
					livrosLength={livros.length}
					buscarLivros={buscarLivros} 
					naoEncontrado={naoEncontrado}
					fimPaginas={fimPaginas}
					carregando={carregando}
					pagina={pagina}
				/>
			</div>
		</>
  	);
};