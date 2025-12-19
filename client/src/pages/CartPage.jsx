import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { updateCartItemLocal, removeFromCartLocal } from '@features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, subtotal, tax, shipping, total } = useSelector((state) => state.cart);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemLocal({ itemId, quantity: newQuantity }));
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCartLocal(itemId));
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Panier - PitLane Shop</title>
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <FiShoppingBag className="mx-auto mb-4 text-gray-600" size={64} />
          <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
          <p className="text-gray-400 mb-8">Découvrez nos produits et commencez vos achats !</p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full hover:shadow-lg transition-all"
          >
            Voir les produits
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panier ({items.length}) - PitLane Shop</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">
          Mon <span className="gradient-text">Panier</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex gap-6"
              >
                <img
                  src={item.image || '/placeholder.jpg'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-2xl font-bold gradient-text">{item.price}€</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <FiTrash2 size={20} />
                  </button>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:text-primary-500 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:text-primary-500 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Résumé</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>TVA (20%)</span>
                <span>{tax.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Livraison</span>
                <span>{shipping === 0 ? 'GRATUIT' : `${shipping.toFixed(2)}€`}</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="gradient-text">{total.toFixed(2)}€</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center font-semibold rounded-full hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              Commander
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
