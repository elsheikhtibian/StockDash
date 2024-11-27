import { Link, NavLink } from "react-router-dom"

export default function Navbar(){
    return <nav className="nav">
        <Link to="/" className="site-title">StockDash</Link>
        <ul>
            <li><NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "active" : "inactive")}>Dashboard</NavLink></li>
            <li><NavLink to="/portfolio" end className={({ isActive }) => (isActive ? "active" : "inactive")}>Portfolio</NavLink></li>
            <li><NavLink to="/watchlist" end className={({ isActive }) => (isActive ? "active" : "inactive")}>Watchlist</NavLink></li>
            <li><NavLink to="/login" end className={({ isActive }) => (isActive ? "active" : "inactive")}>Login</NavLink></li>
        </ul>
    </nav>
}