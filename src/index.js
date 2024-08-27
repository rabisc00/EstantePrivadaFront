import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NovosLivros from './paginas/NovosLivros';
import MeusLivros from "./paginas/MeusLivros";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  	{
		path: "/",
		element: <MeusLivros />
  	},
	{
		path: "/livro-novo",
		element: <NovosLivros />
	}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  	//<React.StrictMode>
    	<RouterProvider router={router} />
  	//</React.StrictMode>
);