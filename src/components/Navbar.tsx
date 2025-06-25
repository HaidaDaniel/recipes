import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from './ui/Button'
import { useAuth } from '../context/AppContext'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-xl font-bold">🍲 Recipes</h1>
      </Link>
      <div className="flex gap-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/add-recipe">
              <Button>Add Recipe</Button>
            </Link>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )}
      </div>
    </nav>
  )
}
