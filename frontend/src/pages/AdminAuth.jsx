import { Link } from "react-router-dom"

function AdminAuth(){

  return(

    <div className="container">

      <div className="card">

      <h1>Painel Administrativo</h1>

      <h3>Escolha uma opção</h3>

      <div>

        <Link to="/create-admin">
          <button>
            Criar novo administrador
          </button>
        </Link>

      </div>

      <div>

        <Link to="/login">
          <button>
            Fazer login
          </button>
        </Link>

      </div>
    </div>
</div>
  )

}

export default AdminAuth