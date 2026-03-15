import { useEffect, useState } from "react"
import { api } from "../services/api"
import { Link } from "react-router-dom"

function ListUsers(){

  const [users, setUsers] = useState([])

  async function loadUsers(){
    const response = await api.get("/listusers")
    setUsers(response.data)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function deleteUser(id){
    await api.delete(`/users/${id}`)
    loadUsers()
  }

return(
  <div className="container">
    <div className="card">
      <h1>Usuários</h1>

      {users.map(user => (
        <div key={user.user_id} className="user-item">
          <span className="user-text">
            {user.user_name} - {user.user_age}
          </span>

          <div className="button-group">
            <Link to={`/edit-user/${user.user_id}`}>
              <button>Editar</button>
            </Link>

            <button onClick={() => deleteUser(user.user_id)}>
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}

export default ListUsers