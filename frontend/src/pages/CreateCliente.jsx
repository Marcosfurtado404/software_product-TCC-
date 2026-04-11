import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../services/api"
import BackButton from "../components/BackButton"

function EditCliente() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [clienteName, setName] = useState("")
  const [clienteAge, setAge] = useState("")
  const [clienteBirthdate, setDate] = useState("")
  const [clientePhonenumb, setPhoneNumber] = useState("")
  const [rimel, setRimel] = useState("")
  const [gestante, setGestante] = useState("")
  const [procRecente, setProcRecente] = useState("")
  const [alergia, setAlergia] = useState("")
  const [tireoide, setTireoide] = useState("")
  const [probOcular, setProbOcular] = useState("")
  const [tratOncologico, setTratOncologico] = useState("")
  const [dormelado, setDormelado] = useState("")
  const [especificProblem, setEspecificProblem] = useState("")
  const [loading, setLoading] = useState(true)

  function emptyToNull(value) {
    return value === "" ? null : value
  }

  function numberOrNull(value) {
    return value === "" ? null : Number(value)
  }

  function booleanOrNull(value) {
    if (value === "") return null
    if (value === "true") return true
    if (value === "false") return false
    return null
  }

  function booleanToString(value) {
    if (value === true) return "true"
    if (value === false) return "false"
    return ""
  }

  useEffect(() => {
    async function loadCliente() {
      try {
        const response = await api.get(`/clientes/${id}`)
        const cliente = response.data

        setName(cliente.clienteName ?? "")
        setAge(cliente.clienteAge ?? "")
        setDate(cliente.clienteBirthdate ?? "")
        setPhoneNumber(cliente.clientePhonenumb ?? "")
        setRimel(booleanToString(cliente.rimel))
        setGestante(booleanToString(cliente.gestante))
        setProcRecente(cliente.procRecente ?? "")
        setAlergia(cliente.alergia ?? "")
        setTireoide(booleanToString(cliente.tireoide))
        setProbOcular(cliente.probOcular ?? "")
        setTratOncologico(cliente.tratOncologico ?? "")
        setDormelado(cliente.dormelado ?? "")
        setEspecificProblem(cliente.especificProblem ?? "")
      } catch (error) {
        alert("Erro ao carregar cliente")
      } finally {
        setLoading(false)
      }
    }

    loadCliente()
  }, [id])

  async function updateCliente(e) {
    e.preventDefault()

    try {
      await api.put(`/clientes/${id}`, {
        clienteName: emptyToNull(clienteName),
        clienteAge: numberOrNull(clienteAge),
        clienteBirthdate: emptyToNull(clienteBirthdate),
        clientePhonenumb: emptyToNull(clientePhonenumb),
        rimel: booleanOrNull(rimel),
        gestante: booleanOrNull(gestante),
        procRecente: emptyToNull(procRecente),
        alergia: emptyToNull(alergia),
        tireoide: booleanOrNull(tireoide),
        probOcular: emptyToNull(probOcular),
        tratOncologico: emptyToNull(tratOncologico),
        dormelado: emptyToNull(dormelado),
        especificProblem: emptyToNull(especificProblem),
      })

      alert("Cliente atualizado")
      navigate("/listClientes")
    } catch (error) {
      alert("Erro ao atualizar cliente")
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h1>Carregando...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Editar Cliente</h1>

        <form onSubmit={updateCliente}>
          <input
            type="text"
            placeholder="Nome"
            value={clienteName}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Idade"
            value={clienteAge}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="date"
            value={clienteBirthdate}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Telefone"
            value={clientePhonenumb}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <select value={rimel} onChange={(e) => setRimel(e.target.value)}>
            <option value="">Usa rímel?</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>

          <select value={gestante} onChange={(e) => setGestante(e.target.value)}>
            <option value="">Gestante?</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>

          <input
            type="text"
            placeholder="Procedimento recente"
            value={procRecente}
            onChange={(e) => setProcRecente(e.target.value)}
          />

          <input
            type="text"
            placeholder="Alergia"
            value={alergia}
            onChange={(e) => setAlergia(e.target.value)}
          />

          <select value={tireoide} onChange={(e) => setTireoide(e.target.value)}>
            <option value="">Problema de tireoide?</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>

          <input
            type="text"
            placeholder="Problema ocular"
            value={probOcular}
            onChange={(e) => setProbOcular(e.target.value)}
          />

          <input
            type="text"
            placeholder="Tratamento oncológico"
            value={tratOncologico}
            onChange={(e) => setTratOncologico(e.target.value)}
          />

          <input
            type="text"
            placeholder="Dorme de lado?"
            value={dormelado}
            onChange={(e) => setDormelado(e.target.value)}
          />

          <input
            type="text"
            placeholder="Problema específico"
            value={especificProblem}
            onChange={(e) => setEspecificProblem(e.target.value)}
          />

          <div className="button-group-column">
            <button type="submit">Atualizar</button>
            <BackButton to="/listClientes" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCliente