import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '@features/products/productsSlice';
import { addToCartLocal } from '@features/cart/cartSlice';
import { FiStar } from 'react-icons/fi';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct: product, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - PitLane Shop</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-blue-900/50 to-red-900/50 rounded-2xl h-96 lg:h-[600px] flex items-center justify-center">
            <span className="text-9xl">🏎️</span>
          </div>

          <div>
            <span className="text-sm text-primary-500 font-semibold uppercase">{product.category}</span>
            <h1 className="text-4xl font-bold mt-2 mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={i < product.rating ? 'fill-primary-500 text-primary-500' : 'text-gray-600'}
                  />
                ))}
              </div>
              <span className="text-gray-400">({product.reviews} avis)</span>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">{product.description}</p>

            <div className="flex items-baseline gap-4 mb-8">
              {product.oldPrice && (
                <span className="text-2xl text-gray-500 line-through">{product.oldPrice}€</span>
              )}
              <span className="text-5xl font-bold gradient-text">{product.price}€</span>
            </div>

            <button
              onClick={() => dispatch(addToCartLocal({ product, quantity: 1 }))}
              className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
