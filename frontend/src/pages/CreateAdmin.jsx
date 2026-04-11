import { useState } from "react"
import { api } from "../services/api"
import BackButton from '../components/BackButton'

function CreateAdmin(){

  const [adminName, setAdminName] = useState("")
  const [adminAge, setAdminAge] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function createAdmin(e){
    e.preventDefault()

    await api.post("/Admins", {
      adminName,
      adminAge,
      email,
      password
    })

    alert("Administrador criado")
  }

  return(

<div className="container">

    <div className="card">

      <h1>Criar Administrador</h1>

      <form onSubmit={createAdmin}>

        <input
          placeholder="Nome"
          value={adminName}
          onChange={e => setAdminName(e.target.value)}
        />

        <input
          placeholder="Idade"
          value={adminAge}
          onChange={e => setAdminAge(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">
          Criar Admin
        </button>

      </form>

    </div>
  </div>
  )


}

export default CreateAdmin