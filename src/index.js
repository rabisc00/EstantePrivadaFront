import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NovosLivros from './paginas/NovosLivros';
import MeusLivros from "./paginas/MeusLivros";
import 'bootstrap/dist/css/bootstrap.min.css';
import { LogsLivro } from './paginas/LogsLivro/LogsLivro';

export const URL_BASE = "http://localhost:8080";
export const IMAGE_DEFAULT = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSidQoav1MLzs-vLXRgx7f4S-16yT0D4YB2A&s";

const router = createBrowserRouter([
  	{
		path: "/",
		element: <MeusLivros />
  	},
	{
		path: "/livro-novo",
		element: <NovosLivros />
	},
	{
		path: "livros/:livroId",
		element: <LogsLivro />
	}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  	//<React.StrictMode>
    	<RouterProvider router={router} />
  	//</React.StrictMode>
);