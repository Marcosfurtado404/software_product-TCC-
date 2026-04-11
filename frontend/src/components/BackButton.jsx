import { useNavigate } from "react-router-dom"

function BackButton({ to }) {
  const navigate = useNavigate()

  function handleBack() {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <button type="button" className="back-button" onClick={handleBack}>
      Voltar
    </button>
  )
}

export default BackButton