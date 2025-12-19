import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/50 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">PitLane Shop</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre boutique spécialisée Formula 1. Passion, qualité et authenticité.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/products?category=promotions" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Promotions
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Aide</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Retours
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  CGV
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <FiFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <FiInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <FiTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} PitLane Shop. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
