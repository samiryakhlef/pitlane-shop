import { Helmet } from 'react-helmet-async';

const OrderDetailPage = () => {
  return (
    <>
      <Helmet>
        <title>Détails Commande - PitLane Shop</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          Détails de la <span className="gradient-text">Commande</span>
        </h1>
      </div>
    </>
  );
};

export default OrderDetailPage;
