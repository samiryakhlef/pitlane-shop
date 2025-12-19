import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - PitLane Shop</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          <span className="gradient-text">Admin</span> Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-primary-500/30 transition-all"
          >
            <h2 className="text-2xl font-bold mb-2">Produits</h2>
            <p className="text-gray-400">Gérer les produits</p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-primary-500/30 transition-all"
          >
            <h2 className="text-2xl font-bold mb-2">Commandes</h2>
            <p className="text-gray-400">Gérer les commandes</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
