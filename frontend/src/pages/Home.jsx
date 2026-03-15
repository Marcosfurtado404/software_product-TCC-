import { Link, useNavigate } from "react-router-dom"

function Home(){

  const navigate = useNavigate()

  function handleLogout(){

    localStorage.removeItem("admin")

    navigate("/login")

  }

  return (

    <div className="container">

      <div className="card">

      <h1>Menu</h1>

      <ul>

        <li>
          <Link to="/listUsers">Listar usuários</Link>
        </li>

        <li>
          <Link to="/create-user">Criar usuário</Link>
        </li>

      </ul>

      <br/>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  </div>
  )

}

export default Home