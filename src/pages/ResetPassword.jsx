import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtém a sessão do Supabase
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setMessage("Sessão inválida ou expirada. Solicite um novo link de redefinição.");
      } else {
        setSession(data.session);
      }
    };
    checkSession();
  }, []);

  async function handleResetPassword(e) {
    e.preventDefault();

    if (!session) {
      setMessage("Sessão inválida. Solicite um novo link de redefinição.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage("Erro ao redefinir a senha: " + error.message);
    } else {
      setMessage("Senha redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
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
