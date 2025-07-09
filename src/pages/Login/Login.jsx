import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoNilzaControll from '/imagens/logoNilzaControll.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button'
import './Login.css';

export default function Login() {
  const [mostrar, setMostrar] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setMostrar(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/Home'); // redireciona se login for bem-sucedido
    } catch (error) {
      setErro('Usuário ou senha incorretos.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <img src={logoNilzaControll} alt="Logo Nilza Controll" className="logoNilzaControll" />
      <h1>Bem Vindo!</h1>

      <div className={"nomeSenha " + (mostrar ? 'show' : '')}>
        <div className="inputName">
          <label htmlFor="nome">E-mail</label>
          <Input
            type="email"
            name="nome"
            id="nome"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputName">
          <label htmlFor="senha">Senha</label>
          <Input
            type="password"
            name="senha"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {erro && <p className="erroLogin">{erro}</p>}

        <Button className="btnLogin" type="button" onClick={handleLogin}>
          ENTRAR
        </Button>
      </div>
    </div>
  );
}

