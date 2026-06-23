import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'

function Dashboard() {
  const [medicines, setMedicines] = useState([])
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  // Backend nunchi data fetch chey
  useEffect(() => {
    fetch('http://localhost:5000/api/medicines')
      .then(res => res.json())
      .then(data => setMedicines(data))
  }, [])

  // New medicine add chey
  const addMedicine = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/api/medicines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, quantity, price })
    })
    const data = await res.json()
    setMedicines([...medicines, data])
    setName('')
    setQuantity('')
    setPrice('')
  }

  const deleteMedicine = async (id) => {
    await fetch(`http://localhost:5000/api/medicines/${id}`, {
      method: 'DELETE'
    })
    setMedicines(medicines.filter(med => med._id !== id))
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Medicines Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <form onSubmit={addMedicine} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={quantity} 
          onChange={e => setQuantity(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={e => setPrice(e.target.value)} 
        />
        <button type="submit">Add Medicine</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%' }}>
        <thead>
          <tr><th>Name</th><th>Quantity</th><th>Price</th><th>Action</th></tr>
        </thead>
        <tbody>
          {medicines.map(med => (
            <tr key={med._id}>
              <td>{med.name}</td>
              <td>{med.quantity}</td>
              <td>{med.price}</td>
              <td><button onClick={() => deleteMedicine(med._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Line 113 taruvatha paste chey
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
