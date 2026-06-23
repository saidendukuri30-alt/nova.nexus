import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    localStorage.setItem('token', 'fake-token-123')
    navigate('/dashboard')
  }

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', fontSize: '16px' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', fontSize: '16px' }}
          required
        />
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '12px', 
            fontSize: '16px', 
            background: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Account ledu? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login
