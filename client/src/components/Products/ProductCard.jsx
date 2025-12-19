import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { addToCartLocal } from '@features/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCartLocal({ product, quantity: 1 }));
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-64 bg-gradient-to-br from-blue-900/50 to-red-900/50 overflow-hidden">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">{product.category === 'Vêtements' ? '👕' : '🏎️'}</span>
          </div>
        )}
        {product.badge && (
          <span className="absolute top-4 right-4 bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        <div className="absolute top-4 left-4 text-xs font-semibold text-white uppercase tracking-wider">
          {product.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={14}
                className={i < product.rating ? 'fill-primary-500 text-primary-500' : 'text-gray-600'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">{product.oldPrice}€</span>
            )}
            <span className="text-2xl font-bold gradient-text">{product.price}€</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary-500/10 hover:bg-gradient-to-br hover:from-primary-500 hover:to-secondary-500 text-primary-500 hover:text-white border border-primary-500/30 hover:border-transparent px-4 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
