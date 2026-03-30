import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaUser, FaChevronDown } from 'react-icons/fa';

const MobileNav = ({ isOpen, onClose }) => {
  const [deskOpen, setDeskOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <nav className="mobile-drawer">
      {/* Quick Action Icons at the Top */}
      <div className="mobile-actions-grid">
        <Link to="/search" className="m-action" onClick={onClose}><FaSearch /><span>Search</span></Link>
        <Link to="/cart" className="m-action" onClick={onClose}><FaShoppingBag /><span>Cart</span></Link>
        <Link to="/login" className="m-action" onClick={onClose}><FaUser /><span>Login</span></Link>
      </div>

      <hr className="drawer-divider" />

      {/* Vertical Links */}
      <div className="drawer-links">
        <NavLink to="/" className="drawer-item" onClick={onClose}>Home</NavLink>
        
        {/* Accordion for Dropdowns */}
        <div className="drawer-item" onClick={() => setDeskOpen(!deskOpen)}>
          Desk Name Plates <FaChevronDown className={deskOpen ? 'rotate' : ''} />
        </div>
        {deskOpen && (
          <div className="drawer-submenu">
            <Link to="/Desk" onClick={onClose}>All Collections</Link>
            <Link to="/Desk/doctors" onClick={onClose}>Doctors</Link>
          </div>
        )}
        
        <NavLink to="/wallpapers" className="drawer-item" onClick={onClose}>Wallpapers</NavLink>
      </div>
    </nav>
  );
};

export default MobileNav;