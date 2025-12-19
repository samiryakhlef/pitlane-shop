import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilters } from '@features/products/productsSlice';
import ProductCard from '@components/Products/ProductCard';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, isLoading, filters } = useSelector((state) => state.products);
  const [localFilters, setLocalFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sortBy: 'newest',
  });

  useEffect(() => {
    dispatch(fetchProducts({ ...localFilters, page: 1, limit: 12 }));
  }, [dispatch, localFilters]);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Produits - PitLane Shop</title>
        <meta name="description" content="Découvrez tous nos produits Formula 1" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">
          Nos <span className="gradient-text">Produits</span>
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500"
          >
            <option value="newest">Plus récents</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="popular">Populaires</option>
          </select>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucun produit trouvé</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
