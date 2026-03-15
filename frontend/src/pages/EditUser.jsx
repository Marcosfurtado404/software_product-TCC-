import { useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../services/api"

function EditUser(){

  const { id } = useParams()

  const [userName, setName] = useState("")
  const [userAge, setAge] = useState("")

  async function updateUser(e){
    e.preventDefault()

    await api.put(`/users/${id}`, {
      userName,
      userAge
    })

    alert("Usuário atualizado")
  }

  return(

    <div className="container">

      <div className="card">

      <h1>Editar Usuário</h1>

      <form onSubmit={updateUser}>

        <input
          placeholder="Nome"
          value={userName}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Idade"
          value={userAge}
          onChange={(e)=>setAge(e.target.value)}
        />

        <button type="submit">
          Atualizar
        </button>

      </form>

    </div>
  </div>
  )

}

export default EditUser