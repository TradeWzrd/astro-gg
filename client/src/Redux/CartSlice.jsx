import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartAPI } from '../services/api';
import { toast } from 'react-hot-toast';

const initialState = {
  cartItems: [], // Array to store cart items
  totalAmount: 0, // Tracks the total value of the cart
  loading: false, // Loading state for async operations
  error: null,    // Error state
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to the cart or update quantity if it exists
    addToCart: (state, action) => {
      const { cart_item_id, item_id, title, description, price, quantity } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.cart_item_id === cart_item_id
      );

      if (existingItem) {
        existingItem.quantity += quantity; // Update quantity if item exists
      } else {
        state.cartItems.push({
          cart_item_id,
          item_id,
          title,
          description,
          price,
          quantity,
        }); // Add new item to the cart
      }

      // Update the total amount after adding an item
      state.totalAmount = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },

    // Remove item from the cart by `cart_item_id`
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.cart_item_id !== action.payload
      );

      // Update the total amount after removing an item
      state.totalAmount = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },

    // Update item quantity in the cart by `cart_item_id`
    updateCartItem: (state, action) => {
      const { cart_item_id, quantity } = action.payload;
      const item = state.cartItems.find(
        (item) => item.cart_item_id === cart_item_id
      );
      if (item && quantity > 0) {
        item.quantity = quantity;
      }

      // Update the total amount after quantity update
      state.totalAmount = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },

    // Set the total amount of the cart
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },

    // Clear all items in the cart and reset total amount
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || [];
        state.totalAmount = action.payload.totalAmount || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch cart';
      })
      
      // Add to cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        // The API should return the updated cart
        state.cartItems = action.payload.items || state.cartItems;
        state.totalAmount = action.payload.totalAmount || state.totalAmount;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add to cart';
      })
      
      // Update cart item
      .addCase(updateItemInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemInCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || state.cartItems;
        state.totalAmount = action.payload.totalAmount || state.totalAmount;
      })
      .addCase(updateItemInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update cart item';
      })
      
      // Remove from cart
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
        state.totalAmount = state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to remove from cart';
      })
      
      // Clear cart
      .addCase(clearCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartItems.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
        state.totalAmount = 0;
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to clear cart';
      });
  },
});

// Async thunks for cart operations
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.getCart();
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not fetch cart');
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch cart' });
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.addToCart(productId, quantity);
      toast.success('Item added to cart');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add to cart');
      return rejectWithValue(error.response?.data || { message: 'Failed to add to cart' });
    }
  }
);

export const updateItemInCart = createAsyncThunk(
  'cart/updateItemInCart',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.updateCartItem(itemId, quantity);
      toast.success('Cart updated');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update cart');
      return rejectWithValue(error.response?.data || { message: 'Failed to update cart' });
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      await cartAPI.removeFromCart(itemId);
      toast.success('Item removed from cart');
      return itemId;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not remove from cart');
      return rejectWithValue(error.response?.data || { message: 'Failed to remove from cart' });
    }
  }
);

export const clearCartItems = createAsyncThunk(
  'cart/clearCartItems',
  async (_, { rejectWithValue }) => {
    try {
      await cartAPI.clearCart();
      toast.success('Cart cleared');
      return null;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not clear cart');
      return rejectWithValue(error.response?.data || { message: 'Failed to clear cart' });
    }
  }
);

// Exporting actions and the reducer
export const { setTotalAmount } = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
