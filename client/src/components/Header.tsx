import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/guests" className="text-xl font-semibold">Hotel Guest Management</Link>
        <nav className="flex gap-2">
          <Link to="/guests" className="btn btn-ghost">Guests</Link>
          <Link to="/guests/new" className="btn btn-primary">Add Guest</Link>
        </nav>
      </div>
    </header>
  )
}
