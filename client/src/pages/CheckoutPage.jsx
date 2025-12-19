import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const { items, total } = useSelector((state) => state.cart);

  return (
    <>
      <Helmet>
        <title>Paiement - PitLane Shop</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          <span className="gradient-text">Paiement</span>
        </h1>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
          <p className="text-center text-gray-400">
            Intégration Stripe à venir - Total: {total.toFixed(2)}€
          </p>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
