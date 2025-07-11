import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useContext } from "react";
import { store } from "../App";

const Navbar = () => {
  const {token, setToken,role, setRole} = useContext(store); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    setToken(null); 
    setRole(null); 
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* Left side: Home Icon */}
        <div>
          <Link to='/'>
            <FaHome className="text-primary text-3xl ml-6" />
          </Link>
        </div>

        {/* Right side: Conditional Links */}
        <div className="flex space-x-6">
          {!token ? (
            // If no token, show Login/Register links
            <>
              <Link to='/about' className="text-primary font-primary font-bold">About</Link>
              <Link to='/login' className="text-primary font-primary font-bold">Login</Link>
            </>
          ) : (
            // If token exists, show Dashboard, Debates, and Logout links
            <>
              {/* Conditional rendering based on role */}
              {role === 'admin' ? (
                <Link to="/admindashboard" className="text-primary font-primary font-bold">Dashboard</Link>
              ) : (
                <Link to="/userdashboard" className="text-primary font-primary font-bold">Dashboard</Link>
              )}
              <Link to="/debatesearch" className="text-primary font-primary font-bold">Debates</Link>
              <button
                onClick={handleLogout}
                className="text-primary font-primary font-bold bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
