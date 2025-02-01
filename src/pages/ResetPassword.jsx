import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSessionValid, setIsSessionValid] = useState(false);
  const navigate = useNavigate();

  // Captura os tokens sincronamente durante a renderização inicial
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = hashParams.get('access_token');
  const refreshToken = hashParams.get('refresh_token');

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      setMessage("Link inválido ou expirado. Solicite um novo.");
      return;
    }

    // Configura a sessão com os tokens
    supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    })
    .then(({ error }) => {
      if (error) {
        setMessage("Erro ao validar token: " + error.message);
        return;
      }
      setIsSessionValid(true); // Sessão válida
    });
  }, [accessToken, refreshToken]);

  async function handleResetPassword(e) {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage("Erro ao redefinir: " + error.message);
    } else {
      setMessage("Senha alterada com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    }
  }

  return (
    <div className="container">
      <h2>Bem vindo ao App</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Nova Senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          disabled={!isSessionValid}
        />
        <button type="submit" disabled={!isSessionValid}>
          Alterar Senha
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}