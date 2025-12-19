/**
 * Données de démonstration pour le mode local
 */

export const mockProducts = [
  {
    id: 'prod_1',
    name: 'Casquette Red Bull Racing',
    category: 'Casquettes',
    description: 'Casquette officielle Red Bull Racing collection 2025. Tissu respirant et ajustement réglable.',
    price: 45,
    oldPrice: null,
    rating: 5,
    reviews: 234,
    badge: 'NOUVEAU',
    images: [],
    stock: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_2',
    name: 'T-Shirt Mercedes AMG',
    category: 'Vêtements',
    description: 'T-shirt premium Mercedes AMG en coton bio. Coupe moderne et confortable.',
    price: 65,
    oldPrice: 85,
    rating: 4,
    reviews: 189,
    badge: '-23%',
    images: [],
    stock: 200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_3',
    name: 'Veste Ferrari Racing',
    category: 'Vêtements',
    description: 'Veste coupe-vent imperméable Ferrari Racing. Parfaite pour toutes conditions météo.',
    price: 199,
    oldPrice: null,
    rating: 5,
    reviews: 456,
    badge: null,
    images: [],
    stock: 75,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_4',
    name: 'Montre McLaren Limited',
    category: 'Accessoires',
    description: 'Édition limitée chronographe McLaren. Mouvement suisse et design exclusif.',
    price: 599,
    oldPrice: null,
    rating: 5,
    reviews: 67,
    badge: 'EXCLUSIF',
    images: [],
    stock: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_5',
    name: 'Modèle réduit F1 2025',
    category: 'Modèles réduits',
    description: 'Réplique détaillée 1:18 de la monoplace championne 2025.',
    price: 129,
    oldPrice: null,
    rating: 5,
    reviews: 342,
    badge: null,
    images: [],
    stock: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_6',
    name: 'Poster Vintage Monaco GP',
    category: 'Posters',
    description: 'Poster rétro du Grand Prix de Monaco. Impression haute qualité sur papier premium.',
    price: 35,
    oldPrice: null,
    rating: 4,
    reviews: 156,
    badge: null,
    images: [],
    stock: 300,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_7',
    name: 'Livre Histoire de la F1',
    category: 'Livres',
    description: 'Encyclopédie complète de l\'histoire de la Formule 1. Plus de 400 pages illustrées.',
    price: 49,
    oldPrice: null,
    rating: 5,
    reviews: 89,
    badge: null,
    images: [],
    stock: 120,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod_8',
    name: 'Casquette Alpine F1',
    category: 'Casquettes',
    description: 'Casquette officielle Alpine F1 Team. Design français élégant.',
    price: 42,
    oldPrice: null,
    rating: 4,
    reviews: 178,
    badge: null,
    images: [],
    stock: 180,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockAdminUser = {
  id: 'admin_1',
  email: 'admin@pitlane.com',
  // Password: Admin123! (déjà hashé avec bcrypt)
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lFEy7jLPDO/2',
  firstName: 'Admin',
  lastName: 'PitLane',
  role: 'admin',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Initialiser la base de données locale avec des données de démo
 */
export const initLocalDb = (db) => {
  console.log('🔧 Initializing local database with mock data...');

  // Ajouter l'utilisateur admin
  db.collections.users.set(mockAdminUser.id, mockAdminUser);

  // Ajouter les produits
  mockProducts.forEach(product => {
    db.collections.products.set(product.id, product);
  });

  console.log(`✅ Local database initialized:`);
  console.log(`   - 1 admin user: admin@pitlane.com / Admin123!`);
  console.log(`   - ${mockProducts.length} products`);
};
