import "./LivrosTable.css";

const IMAGE_DEFAULT = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSidQoav1MLzs-vLXRgx7f4S-16yT0D4YB2A&s";

export const LivrosTable = ({ livros }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Título</th>
                    <th>Subtítulo</th>
                    <th>Autor</th>
                    <th>Editora</th>
                    <th>Lançamento</th>
                    <th>Idioma</th>
                    <th>ISBN</th>
                </tr>
            </thead>
            <tbody>
                {livros.map((l) => 
                    <tr key={l.id}>
                        <td><img src={l.imagem != null ? l.imagem : IMAGE_DEFAULT} alt={l.titulo} /></td>
                        <td>{l.titulo ? l.titulo : "Não tem"}</td>
                        <td>{l.subtitulo != null ? l.subtitulo : "Não tem"}</td>
                        <td>{l.autor != null ? l.autor : "Não encontrado"}</td>
                        <td>{l.editora != null ? l.editora : "Não encontrada"}</td>
                        <td>{l.anoLancamento != null ? l.anoLancamento : "Não encontrado"}</td>
                        <td>{l.idioma != null ? l.idioma : "Não encontrado"}</td>
                        <td>{l.isbn != null ? l.isbn : "Não encontrado"}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}