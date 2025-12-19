import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Helmet>
        <title>Mon Profil - PitLane Shop</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          Mon <span className="gradient-text">Profil</span>
        </h1>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">Nom complet</label>
              <p className="text-lg">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Email</label>
              <p className="text-lg">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
