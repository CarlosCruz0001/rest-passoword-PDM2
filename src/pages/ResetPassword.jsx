import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se os tokens estão no hash ou na query string
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const queryParams = new URLSearchParams(window.location.search);
    
    // Prioriza os parâmetros do hash (comum em fluxos OAuth)
    const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token') || queryParams.get('refresh_token');

    console.log("Tokens capturados:", { accessToken, refreshToken }); // Debug

    if (!accessToken || !refreshToken) {
      setMessage("Link inválido ou expirado. Solicite um novo.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    })
    .then(({ error }) => {
      if (error) {
        console.error("Erro na sessão:", error); // Debug detalhado
        setMessage(`Falha na validação: ${error.message}`);
        return;
      }
      setIsSessionValid(true);
      setMessage(""); // Limpa mensagens de erro anteriores
    })
    .finally(() => setIsLoading(false));
  }, []);

  async function handleResetPassword(e) {
    e.preventDefault();

    if (newPassword.length < 6) {
      setMessage("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;
      
      setMessage("Senha redefinida com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Erro na redefinição:", error); // Debug
      setMessage(`Erro: ${error.message}`);
    }
  }

  return (
    <div className="container">
      <h2>Redefinir Senha</h2>
      
      {isLoading ? (
        <p>Validando token de acesso...</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={!isSessionValid}
            minLength={6}
          />
          <button 
            type="submit" 
            disabled={!isSessionValid}
            className={!isSessionValid ? "disabled-button" : ""}
          >
            Redefinir Senha
          </button>
        </form>
      )}

      {message && <p className={isSessionValid ? "success" : "error"}>{message}</p>}
    </div>
  );
}