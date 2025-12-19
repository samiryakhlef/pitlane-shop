import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '@services/cartService';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  isLoading: false,
  error: null,
};

// Actions asynchrones
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(productId, quantity);
      toast.success('Produit ajouté au panier !');
      return response;
    } catch (error) {
      toast.error(error.message || 'Erreur lors de l\'ajout au panier');
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateCartItem(itemId, quantity);
      return response;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(itemId);
      toast.success('Produit retiré du panier');
      return response;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await cartService.clearCart();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const calculateTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.20; // TVA 20%
  const shipping = subtotal > 100 ? 0 : 9.99; // Livraison gratuite > 100€
  const total = subtotal + tax + shipping;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    total: Number(total.toFixed(2)),
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Actions locales (sans API)
    addToCartLocal: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          quantity,
        });
      }

      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      toast.success('Produit ajouté au panier !');
    },
    updateCartItemLocal: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item.id === itemId);

      if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== itemId);
        }
      }

      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
    },
    removeFromCartLocal: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      toast.success('Produit retiré du panier');
    },
    clearCartLocal: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
      state.tax = 0;
      state.shipping = 0;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items || [];
        const totals = calculateTotals(state.items);
        Object.assign(state, totals);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        const totals = calculateTotals(state.items);
        Object.assign(state, totals);
      })
      // Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        const totals = calculateTotals(state.items);
        Object.assign(state, totals);
      })
      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        const totals = calculateTotals(state.items);
        Object.assign(state, totals);
      })
      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.subtotal = 0;
        state.tax = 0;
        state.shipping = 0;
        state.total = 0;
      });
  },
});

export const {
  addToCartLocal,
  updateCartItemLocal,
  removeFromCartLocal,
  clearCartLocal
} = cartSlice.actions;

export default cartSlice.reducer;
