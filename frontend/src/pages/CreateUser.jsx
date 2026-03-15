import { useState } from "react"
import { api } from "../services/api"

function CreateUser(){

  const [userName, setName] = useState("")
  const [userAge, setAge] = useState("")

  async function createUser(e){
    e.preventDefault()

    await api.post("/users", {
      userName,
      userAge
    })

    alert("Usuário criado")
  }

  return(

    <div className="container">

      <div className="card">

      <h1>Criar Usuário</h1>

      <form onSubmit={createUser}>

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
          Criar
        </button>

      </form>

    </div>
  </div>
  )

}

export default CreateUser