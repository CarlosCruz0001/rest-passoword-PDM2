export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Novo estado
  const navigate = useNavigate();

  useEffect(() => {
    // Captura os tokens DENTRO do useEffect
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get('access_token');
    const refreshToken = queryParams.get('refresh_token');

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
        setMessage("Erro ao validar token: " + error.message);
        return;
      }
      setIsSessionValid(true);
    })
    .finally(() => setIsLoading(false));
  }, []); // Dependências removidas

  async function handleResetPassword(e) {
    e.preventDefault();

    if (newPassword.length < 6) {
      setMessage("A senha deve ter pelo menos 6 caracteres");
      return;
    }

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
      <h2>Redefinir Senha</h2>
      {isLoading ? (
        <p>Validando token...</p>
      ) : (
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
      )}
      {message && <p>{message}</p>}
    </div>
  );
}