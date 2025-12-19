/**
 * Base de données locale en mémoire pour le développement
 * À utiliser quand Google Cloud n'est pas configuré
 */

class LocalDatabase {
  constructor() {
    this.collections = {
      users: new Map(),
      products: new Map(),
      orders: new Map(),
    };
    this.autoId = 0;
  }

  // Simuler Firestore collection()
  collection(name) {
    if (!this.collections[name]) {
      this.collections[name] = new Map();
    }

    return {
      // GET all documents
      get: async () => {
        const docs = [];
        this.collections[name].forEach((data, id) => {
          docs.push({
            id,
            exists: true,
            data: () => data,
          });
        });
        return {
          empty: docs.length === 0,
          docs,
        };
      },

      // GET document by ID
      doc: (id) => ({
        get: async () => {
          const data = this.collections[name].get(id);
          return {
            id,
            exists: !!data,
            data: () => data,
          };
        },

        set: async (data) => {
          this.collections[name].set(id, { ...data });
          return { id };
        },

        update: async (data) => {
          const existing = this.collections[name].get(id);
          if (existing) {
            this.collections[name].set(id, { ...existing, ...data });
          }
          return { id };
        },

        delete: async () => {
          this.collections[name].delete(id);
          return { id };
        },

        collection: (subCollectionName) => {
          const subKey = `${name}/${id}/${subCollectionName}`;
          if (!this.collections[subKey]) {
            this.collections[subKey] = new Map();
          }
          return this.collection(subKey);
        },
      }),

      // ADD new document
      add: async (data) => {
        const id = `${name}_${++this.autoId}`;
        this.collections[name].set(id, { ...data });
        return { id };
      },

      // WHERE query
      where: (field, operator, value) => ({
        get: async () => {
          const docs = [];
          this.collections[name].forEach((data, id) => {
            let match = false;

            switch (operator) {
              case '==':
                match = data[field] === value;
                break;
              case '!=':
                match = data[field] !== value;
                break;
              case '>':
                match = data[field] > value;
                break;
              case '>=':
                match = data[field] >= value;
                break;
              case '<':
                match = data[field] < value;
                break;
              case '<=':
                match = data[field] <= value;
                break;
              default:
                match = false;
            }

            if (match) {
              docs.push({
                id,
                exists: true,
                data: () => data,
              });
            }
          });

          return {
            empty: docs.length === 0,
            docs,
          };
        },

        orderBy: () => ({ get: async () => ({ empty: true, docs: [] }) }),
      }),

      // ORDER BY
      orderBy: (field, direction = 'asc') => ({
        get: async () => {
          const docs = [];
          this.collections[name].forEach((data, id) => {
            docs.push({ id, data, exists: true, data: () => data });
          });

          docs.sort((a, b) => {
            const aVal = a.data()[field];
            const bVal = b.data()[field];
            if (direction === 'desc') {
              return bVal > aVal ? 1 : -1;
            }
            return aVal > bVal ? 1 : -1;
          });

          return { empty: docs.length === 0, docs };
        },
      }),
    };
  }

  // Batch operations
  batch() {
    const operations = [];

    return {
      delete: (ref) => {
        operations.push({ type: 'delete', ref });
      },
      commit: async () => {
        for (const op of operations) {
          if (op.type === 'delete') {
            // Simule la suppression
            await op.ref.delete();
          }
        }
      },
    };
  }

  // Settings (no-op pour compatibilité)
  settings() {}
}

export const localDb = new LocalDatabase();
export default localDb;
