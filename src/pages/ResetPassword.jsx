import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();  // Para acessar os parâmetros da URL

  // Função para extrair o token da URL
  const getTokenFromURL = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('token');  // Supondo que o token venha como parâmetro 'token'
  };

  async function handleResetPassword(e) {
    e.preventDefault();
    const token = getTokenFromURL();

    if (token) {
      const { error } = await supabase.auth.api.updateUser(token, { password: newPassword });

      if (error) {
        setMessage("Erro ao redefinir a senha: " + error.message);
      } else {
        setMessage("Senha redefinida com sucesso!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } else {
      setMessage("Token de redefinição inválido.");
    }
  }

  return (
    <div className="container">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Nova Senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Alterar Senha</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}