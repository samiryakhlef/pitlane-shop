import { Helmet } from 'react-helmet-async';

const AdminOrders = () => {
  return (
    <>
      <Helmet>
        <title>Gestion Commandes - Admin</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          Gestion des <span className="gradient-text">Commandes</span>
        </h1>
      </div>
    </>
  );
};

export default AdminOrders;
