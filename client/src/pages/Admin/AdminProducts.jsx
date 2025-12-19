import { Helmet } from 'react-helmet-async';

const AdminProducts = () => {
  return (
    <>
      <Helmet>
        <title>Gestion Produits - Admin</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          Gestion des <span className="gradient-text">Produits</span>
        </h1>
      </div>
    </>
  );
};

export default AdminProducts;
