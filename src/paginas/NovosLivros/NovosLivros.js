import "./NovosLivros.css";
import { useState, useEffect, useCallback, useRef } from 'react';
import FormularioLivroNovo from "../../componentes/FormularioLivroNovo";
import ListagemLivrosNovos from "../../componentes/ListagemLivrosNovos";

export const NovosLivros = () => {
    const [livroPesquisa, setLivroPesquisa] = useState({
		titulo: '',
		autor: '',
		editora: '', 
		isbn: ''
	});
	const [livros, setLivros] = useState([]);
	const [naoEncontrado, setNaoEncontrado] = useState(false);
	const [fimPaginas, setFimPaginas] = useState(false);
	const [pagina, setPagina] = useState(1);
	const [carregando, setCarregando] = useState(false);

	const firstRender = useRef(true);

	const aoPesquisar = (p) => {
		setLivroPesquisa(p);
		setPagina(1);
	};

    const buscarLivros = useCallback(async (pagina) => {
		setCarregando(true);
        const url = "http://localhost:8080/livros/pesquisar?titulo=" + livroPesquisa.titulo + "&autor=" + livroPesquisa.autor + 
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

	const proximaPagina = () => {
        setPagina((atual) => atual + 1);
    };

    const paginaAnterior = () => {
        setPagina((atual) => atual - 1);
    };

	useEffect(() => {
		if (!firstRender.current) {
			buscarLivros(1);
		}
		else firstRender.current = false;
	}, [buscarLivros]);

  	return (
    	<div className="wrapper">
			<FormularioLivroNovo aoPesquisar={aoPesquisar} />
			<ListagemLivrosNovos 
				livros={livros} 
				buscarLivros={buscarLivros} 
				naoEncontrado={naoEncontrado}
				fimPaginas={fimPaginas}
				carregando={carregando}
				pagina={pagina}
				proximaPagina={proximaPagina}
				paginaAnterior={paginaAnterior}
			/>
    	</div>
  	);
};