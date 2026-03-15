import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Home from "./pages/home"
import ListUsers from "./pages/ListUsers"
import CreateUser from "./pages/createUser"
import EditUser from "./pages/EditUser"
import CreateAdmin from "./pages/CreateAdmin"
import AdminAuth from "./pages/AdminAuth"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"


function App(){

  return (
    <BrowserRouter>
     
<Routes>

  <Route path="/" element={<Navigate to="/login" />} />

  <Route path="/login" element={<Login />} />

  <Route path="/admin" element={<AdminAuth />} />

  <Route path="/create-admin" element={<CreateAdmin />} />

  <Route 
    path="/home"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />

  <Route 
    path="/listUsers"
    element={
      <ProtectedRoute>
        <ListUsers />
      </ProtectedRoute>
    }
  />

  <Route 
    path="/create-user"
    element={
      <ProtectedRoute>
        <CreateUser />
      </ProtectedRoute>
    }
  />

  <Route 
    path="/edit-user/:id"
    element={
      <ProtectedRoute>
        <EditUser />
      </ProtectedRoute>
    }
  />

</Routes>
      

    </BrowserRouter>
  )

}

export default App