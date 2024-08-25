import "./InputTexto.css";

export const InputTexto = ({ label, placeholder, valor, aoAlterar }) => {
    return (
        <div className="input-texto">
            <label>{label}</label>
            <input 
                value={valor}
                onChange={e => aoAlterar(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}