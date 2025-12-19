import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiTrendingUp, FiAward, FiClock } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@features/products/productsSlice';
import ProductCard from '@components/Products/ProductCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 4 }));
  }, [dispatch]);

  const categories = [
    { name: 'Vêtements', icon: '👕', count: 230 },
    { name: 'Casquettes', icon: '🧢', count: 145 },
    { name: 'Accessoires', icon: '⌚', count: 189 },
    { name: 'Modèles réduits', icon: '🏎️', count: 98 },
    { name: 'Posters', icon: '🖼️', count: 167 },
    { name: 'Livres', icon: '📚', count: 76 },
  ];

  return (
    <>
      <Helmet>
        <title>PitLane Shop - Boutique Formula 1 Premium</title>
        <meta
          name="description"
          content="Découvrez notre collection exclusive d'articles Formula 1. Des vêtements aux accessoires, vivez votre passion au quotidien."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-500 px-4 py-2 rounded-full text-sm font-semibold border border-primary-500/20">
                <FiTrendingUp />
                Collection 2025
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                La Passion F1
                <span className="block gradient-text">À Votre Service</span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                Découvrez notre collection exclusive d'articles premium Formula 1. Des vêtements aux
                accessoires, vivez votre passion au quotidien.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary-500/50 transition-all hover:-translate-y-1"
                >
                  Découvrir la collection
                </Link>
                <Link
                  to="/products?category=promotions"
                  className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-all"
                >
                  Offres spéciales
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-3xl p-8">
                <div className="bg-gradient-to-br from-blue-900 to-red-900 rounded-2xl h-96 flex items-center justify-center text-8xl">
                  🏎️
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
            <div className="text-center">
              <FiAward className="mx-auto mb-4 text-primary-500" size={32} />
              <div className="text-4xl font-bold gradient-text mb-2">500+</div>
              <div className="text-gray-400">Produits</div>
            </div>
            <div className="text-center">
              <FiAward className="mx-auto mb-4 text-primary-500" size={32} />
              <div className="text-4xl font-bold gradient-text mb-2">15K+</div>
              <div className="text-gray-400">Clients</div>
            </div>
            <div className="text-center">
              <FiClock className="mx-auto mb-4 text-primary-500" size={32} />
              <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Explorez par <span className="gradient-text">Catégorie</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/products?category=${cat.name.toLowerCase()}`}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-center hover:bg-primary-500/5 hover:border-primary-500/30 transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="font-semibold text-white mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-400">{cat.count} produits</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Produits <span className="gradient-text">En Vedette</span>
            </h2>
            <p className="text-gray-400">Découvrez notre sélection de produits premium Formula 1</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block px-8 py-3 border border-primary-500 text-primary-500 font-semibold rounded-full hover:bg-primary-500 hover:text-white transition-all"
            >
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border-y border-primary-500/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Restez Informé</h2>
          <p className="text-gray-400 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir les dernières offres et nouveautés
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default HomePage;
