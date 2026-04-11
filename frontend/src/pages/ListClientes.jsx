import { useEffect, useState } from "react"
import { api } from "../services/api"
import { Link } from "react-router-dom"
import BackButton from '../components/BackButton'


function ListClientes(){

  const [Clientes, setCliente] = useState([])

  async function loadCliente(){
    const response = await api.get("/listclientes")
    setCliente(response.data)
  }

  useEffect(() => {
    loadCliente()
  }, [])

  async function deleteCliente(id){
    await api.delete(`/clientes/${id}`)
    loadCliente()
  }

return(
  <div className="container">
    <div className="card">
      <h1>Clientes</h1>

      {Clientes.map(cliente => (
        <div key={cliente.cliente_id} className="cliente-item">
          <span className="cliente-text">
            {cliente.cliente_name} - {cliente.cliente_age}
          </span>

          <div className="button-group">
            <Link to={`/edit-cliente/${cliente.cliente_id}`}>
              <button>Editar</button>
            </Link>

            <button onClick={() => deleteCliente(cliente.cliente_id)}>
              Deletar
            </button>
          </div>
        </div>
      ))}
      <BackButton />
    </div>
  </div>
)
}

export default ListClientes