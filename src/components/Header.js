import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// ✅ KEEP BOTH (NO BREAK)
import { FaSearch, FaChevronDown, FaSignInAlt, FaUserPlus, FaHeart, FaSignOutAlt, FaShoppingBag, FaTimes } from "react-icons/fa";

// ✅ NEW THIN ICONS
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";

import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirebase } from '../context/FirebaseContext';
import toast from 'react-hot-toast';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import './Header.css';


const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deskOpen, setDeskOpen] = useState(false);
  const [houseOpen, setHouseOpen] = useState(false);
  const [Othersopen, setOthersopen] = useState(false);
  const [afsopen, setafsopen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);


  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { user, logout } = useFirebase();

  const isLoggedIn = !!user;
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };


  const navigate = useNavigate()

  // Update view on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    setDeskOpen(false);
    setHouseOpen(false);
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate(path);
  };

  const fetchSuggestions = async (value) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      const results = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // 🔍 match name (you can change field)
        if (
          data.name?.toLowerCase().includes(value.toLowerCase())
        ) {
          results.push({ id: doc.id, ...data });
        }
      });

      setSuggestions(results.slice(0, 6)); // limit results
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      <header className="main-header">

        <div className="header-container">
          {/* LOGO */}
          <div className="logo-section">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img src="/images/afs1.jpeg" className="brand-logo" alt="AFS Logo" />
            </Link>
          </div>

          {/* NAVIGATION */}
          <nav className={`nav-links mx-5 ${menuOpen ? 'mobile-active' : ''}`}>
            <NavLink to="/" className="nav-item">Home</NavLink>

            {/* DESK DROPDOWN */}
            <div
              className="nav-item dropdown-trigger"
              onMouseEnter={() => setDeskOpen(true)}
              onMouseLeave={() => setDeskOpen(false)}
            >
              <div className="nav-label-content">
                Desk Name Plates <FaChevronDown className="arrow-icon" />
              </div>
              <AnimatePresence>
                {deskOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mega-menu"
                  >
                    <div className="mega-menu-content">
                      <div className="menu-column">
                        <h6>All Collections</h6>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Desk')}>All Name Plates</div>
                      </div>
                      <div className="menu-column">
                        <h6>Browse By Profession</h6>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Desk/doctors')}>Doctors & Dentists</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Desk/advocates')}>Lawyers & Judges</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Desk/teachers')}>Teachers</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Desk/police')}>Police Officers</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Desk/ca')}>CA, CFA, CMA & CS</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Desk/armed')}>Armed Forces</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Desk/government')}>Government Officials</div>

                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* HOUSE DROPDOWN */}
            <div
              className="nav-item dropdown-trigger"
              onMouseEnter={() => setHouseOpen(true)}
              onMouseLeave={() => setHouseOpen(false)}
            >
              <div className="nav-label-content">
                House Name Plates <FaChevronDown className="arrow-icon" />
              </div>
              <AnimatePresence>
                {houseOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mega-menu"
                  >
                    <div className="mega-menu-content">
                      <div className="menu-column">
                        <h6>All Collections</h6>
                        <div className="menu-item-row" onClick={() => handleNavigation('/House')}>All House Plates</div>
                      </div>
                      <div className="menu-column">
                        <h6>Styles & Features</h6>
                        <div className="menu-item-row" onClick={() => handleNavigation('/House/cutout')}>Cutout Name Plates</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/House/led')}>LED Name Plates</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/House/hanging')}>Hanging Name Plates</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/House/numberplates')}>Number Sign Plates</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/House/photo')}>Photo Name Plates</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/House/planter')}>Planter Name Plates</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="menu-column" style={{ cursor: "pointer" }} onClick={() => handleNavigation('/Wallpapers')}>Wallpapers</div>
            <div
              className="nav-item dropdown-trigger"
              onMouseEnter={() => setOthersopen(true)}
              onMouseLeave={() => setOthersopen(false)}
            >
              <div className="nav-label-content">
                Others <FaChevronDown className="arrow-icon" />
              </div>
              <AnimatePresence>
                {Othersopen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mega-menu"
                  >
                    <div className="mega-menu-content">
                      <div className="menu-column">

                        <div className="menu-item-row" onClick={() => handleNavigation('/Others/gst')}>Gst Name boards</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Others/kids')}>Kids Room Signs</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Others/signages')}>Signages</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/Others/clocks')}>Clocks</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="nav-item dropdown-trigger"
              onMouseEnter={() => setafsopen(true)}
              onMouseLeave={() => setafsopen(false)}
            >
              <div className="nav-label-content">
                AFS <FaChevronDown className="arrow-icon" />
              </div>
              <AnimatePresence>
                {afsopen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mega-menu"
                  >
                    <div className="mega-menu-content">
                      <div className="menu-column">

                        <div className="menu-item-row" onClick={() => handleNavigation('/gallery')}>Gallery</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/review')}>Review</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/about')}>About Us</div>
                        <div className="menu-item-row" onClick={() => handleNavigation('/contact')}>Contact Us</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* 🔍 SEARCH */}

          {/* ACTIONS */}
          <div className="header-actions">

            {/* 🔍 SEARCH ICON */}
            <button
              className="btn-search"
              onClick={() => setSearchOpen(prev => !prev)}
            >
              <FiSearch size={22} />
            </button>

            <div
              className="account-wrapper"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >

              <button className="btn-account ">
                <FiUser size={22} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="account-dropdown"
                  >
                    {!isLoggedIn ? (
                      <>
                        <div className="drop-link" onClick={() => handleNavigation('/login')}><FaSignInAlt /> Sign In</div>
                        <div className="drop-link" onClick={() => handleNavigation('/register')}><FaUserPlus /> Sign Up</div>
                      </>
                    ) : (
                      <>
                        {/* ✅ User Email Display */}
                        <div className="drop-link user-email-display">
                          <FiUser size={16} />
                          <span className="user-email">{user.email}</span>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div className="drop-link" onClick={() => handleNavigation('/orders')}><FiShoppingBag size={18} /> Orders</div>
                        <div className="drop-link" onClick={() => handleNavigation('/wishlist')}><FaHeart /> Wishlist {wishlistCount > 0 && <span className="badge-small">{wishlistCount}</span>}</div>
                        <div className="dropdown-divider"></div>
                        <div className="drop-link logout" onClick={handleLogout}><FaSignOutAlt /> Logout</div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>



            <div className="cart-icon-wrapper ">
              <FiShoppingBag size={22} onClick={() => navigate("/cart")} />
              {cartCount > 0 && <span className="badge-count ">{cartCount}</span>}
            </div>


            {isMobile && (
              <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </div>
            )}
          </div>
        </div>

      </header>
      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="search-overlay-container"
          >
            <div className="search-box-compact">
              <div className="search-input-group">
                <FiSearch className="search-icon-inner" size={18} />
                <input
                  type="text"
                  placeholder="Search for nameplates, wallpapers..."
                  value={searchTerm}
                  autoFocus
                  onChange={(e) => fetchSuggestions(e.target.value)}
                  className="search-input-compact"
                />
                <FiX className="close-search-btn" size={20} onClick={() => setSearchOpen(false)} />
              </div>

              {/* Suggestions list */}
              {searchTerm && (
                <div className="search-results-dropdown">
                  {loading ? (
                    <div className="p-3 text-center text-muted">Searching...</div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <div
                        key={item.id}
                        className="result-card"
                        onClick={() => {
                          navigate(`/product/${item.id}`);
                          setSearchOpen(false);
                        }}
                      >
                        <img src={item.images[0]} alt={item.name} className="result-img" />
                        <div className="result-info">
                          <span className="result-name">{item.name}</span>
                          <span className="result-category">Name Plate</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-muted">No products found.</div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default Header;