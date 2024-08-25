import './App.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import FormularioLivroNovo from "./componentes/FormularioLivroNovo";
import LivrosTable from './componentes/LivrosTable';

function App() {
	const [livroPesquisa, setLivroPesquisa] = useState({
		titulo: '',
		autor: '',
		editora: '', 
		isbn: ''
	});
	const [livros, setLivros] = useState([]);
	const [mensagem, setMensagem] = useState('');
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
			setMensagem("");
		} catch (ex) {
			setMensagem("Não encontramos livros com esses parâmetros");
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
    	<div className="App">
			<FormularioLivroNovo aoPesquisar={aoPesquisar} />
			<LivrosTable 
				livros={livros} 
				buscarLivros={buscarLivros} 
				mensagem={mensagem}
				carregando={carregando}
				pagina={pagina}
				proximaPagina={proximaPagina}
				paginaAnterior={paginaAnterior}
			/>
    	</div>
  	);
}

export default App;
