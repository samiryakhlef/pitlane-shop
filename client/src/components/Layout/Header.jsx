import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { logout } from "@features/auth/authSlice";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-lg shadow-lg shadow-primary-500/10"
          : "bg-black/95 backdrop-blur-md"
      } border-b border-primary-500/20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-primary-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-2xl font-bold">
              <span className="gradient-text">PITLANE</span>
              <span className="block text-xs text-primary-500 tracking-[0.3em]">
                SHOP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <Link
              to="/"
              className="text-sm font-medium text-white hover:text-primary-500 transition-colors uppercase tracking-wide relative group"
            >
              Accueil
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-4/5 transition-all duration-300"></span>
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-white hover:text-primary-500 transition-colors uppercase tracking-wide relative group"
            >
              Produits
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-4/5 transition-all duration-300"></span>
            </Link>
            <Link
              to="/products?category=nouveautes"
              className="text-sm font-medium text-white hover:text-primary-500 transition-colors uppercase tracking-wide relative group"
            >
              Nouveautés
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-4/5 transition-all duration-300"></span>
            </Link>
            <Link
              to="/products?category=promotions"
              className="text-sm font-medium text-white hover:text-primary-500 transition-colors uppercase tracking-wide relative group"
            >
              Promotions
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-4/5 transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              className="p-2 text-white hover:text-primary-500 transition-all hover:scale-110"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch size={22} />
            </button>

            {/* User */}
            <div className="relative group">
              <button className="p-2 text-white hover:text-primary-500 transition-all hover:scale-110">
                <FiUser size={22} />
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-primary-500/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                    >
                      Mon Profil
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-white hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                    >
                      Mes Commandes
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-white hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-white hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm text-white hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                    >
                      Inscription
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-white hover:text-primary-500 transition-all hover:scale-110"
            >
              <FiShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-slide-down">
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full px-4 py-3 bg-white/5 border border-primary-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/98 border-t border-primary-500/20 animate-slide-down">
          <nav className="px-4 py-6 space-y-4">
            <Link
              to="/"
              className="block text-white hover:text-primary-500 transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="block text-white hover:text-primary-500 transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Produits
            </Link>
            <Link
              to="/products?category=nouveautes"
              className="block text-white hover:text-primary-500 transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nouveautés
            </Link>
            <Link
              to="/products?category=promotions"
              className="block text-white hover:text-primary-500 transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Promotions
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
