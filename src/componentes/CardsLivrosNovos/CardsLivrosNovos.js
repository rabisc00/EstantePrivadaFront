import "./CardsLivrosNovos.css";
import { useState, useEffect } from "react";
import CardLivroNovo from "../CardLivroNovo";

export const CardsLivrosNovos = ({ livros }) => {
    const [dictAtivos, setDictAtivos] = useState({});

    const setSelecionado = (id, selecionado) => {
        const novoDict = {};

        const dictKeys = Object.keys(dictAtivos);
        dictKeys.forEach(k => {
            if (k === id) novoDict[k] = selecionado;
            else novoDict[k] = false;
        });

        setDictAtivos(novoDict);
    }

    useEffect(() => {
        const dictFinal = {};
        for (let i = 0; i < livros.length; i++) {
            dictFinal[livros[i].id] = false;
        }

        setDictAtivos(dictFinal);
    }, [livros]);

    return (
        <div className="todos-livros-novos">
            {livros.map((l) => 
                <CardLivroNovo 
                    key={l.id} 
                    livro={l} 
                    selecionado={dictAtivos[l.id]} 
                    setSelecionado={setSelecionado}
                />)}
        </div>
    );
}