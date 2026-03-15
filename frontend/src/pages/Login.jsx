import { useState } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Login(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()

    try{

      const response = await api.post("/login", {
        email,
        password
      })

      console.log(response.data)

      localStorage.setItem("admin", JSON.stringify(response.data))

      alert("Login realizado")

      navigate("/Home")

    }catch(error){

      console.error(error)
      alert("Email ou senha inválidos")

    }
  }

  return(

    <div className="container">

      <div className="card">

      <h1>Login Administrador</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />

        <button type="submit">
          Entrar
        </button>

       </form>

    <br/>

    <Link to="/create-admin">
      <button>
        Criar administrador
      </button>
    </Link>



    </div>
  </div>

  )

}

export default Login