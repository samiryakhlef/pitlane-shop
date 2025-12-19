import { Helmet } from 'react-helmet-async';

const OrdersPage = () => {
  return (
    <>
      <Helmet>
        <title>Mes Commandes - PitLane Shop</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          Mes <span className="gradient-text">Commandes</span>
        </h1>

        <div className="text-center py-20 text-gray-400">
          Aucune commande pour le moment
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
