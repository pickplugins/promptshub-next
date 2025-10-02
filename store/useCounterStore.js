// src/store/useCounterStore.js
import { IconCurrency } from '@tabler/icons-react';
import { create } from 'zustand'

export const useCounterStore = create((set) => ({


  cartItems: [],
  appData: {
    serverUrl: "http://localhost/wp/",
    appUrl: "http://localhost:3000/",
  },
  // appData: {
  //   serverUrl: "https://server.promptshub.net/",
  //   appUrl: "https://promptshub.net/",
  // },


  notifications: [],
  userDataX: null,
  currency: "BDT",
  currencyPosition: "after",
  currencySymbole: "Tk",
  coupons: {
    applied: false,
    couponCode: "",
    discountType: "percent", // "percent" or "fixed"
    discountAmount: 0,
    amount: 0,
    loading: false,
  },

  setCoupons: (newCoupons) =>
    set((state) => ({
      coupons: { ...state.coupons, ...newCoupons },
    })),

  resetCoupons: () =>
    set({
      coupons: {
        applied: false,
        couponCode: "",
        discountType: "percent",
        discountAmount: 10,
      },
    }),
  // ✅ Update any coupon property
  updateCoupons: (key, value) =>
    set((state) => ({
      coupons: {
        ...state.coupons,
        [key]: value, // dynamic property update
      },
    })),



  lang: 'en',

  setlang: () =>
    set((state) => ({
      lang: state.lang,
    })),


  mobileMenu: 0,
  setmobileMenu: (value) => set({ mobileMenu: value }),
  cartTotal: 0,
  setcartTotal: (amount) => set({ cartTotal: amount }),

  shippingMethod: "normal",
  setshippingMethod: (value) => set({ shippingMethod: value }),

  shippingCost: 0,
  setshippingCost: (amount) => set({ shippingCost: amount }),

  cartTotalPay: 0,
  setcartTotalPay: (amount) => set({ cartTotalPay: amount }),

  navToggle: false,
  setnavToggle: () =>
    set((state) => ({
      navToggle: !state.navToggle,
    })),

  cartToggle: false,
  setcartToggle: (value) =>
    set((state) => ({
      cartToggle: value ? value : !state.cartToggle,
    })),


  addNotification: (newNotification) =>
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((todo) => todo.id !== id),
    })),
  resetNotification: (id) =>
    set((state) => ({
      notifications: [],
    })),
  updateNotification: (id, updatedFields) => set((state) => ({
    notifications: state.notifications.map((todo) =>
      todo.id === id ? { ...todo, ...updatedFields } : todo
    ),
  })),


  addCartItems: (newCartItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === newCartItem.id
      );

      if (existingItem) {
        // update quantity of existing product
        state.addNotification({ type: 'success', title: 'Item updated to cart', content: "" })


        return {
          cartItems: state.cartItems.map((item) =>
            item.id === newCartItem.id
              ? { ...item, quantity: item.quantity + newCartItem.quantity }
              : item
          ),
        };
      } else {
        // add new product to cart
        state.addNotification({ type: 'success', title: 'Item(s) added to cart', content: "" })

        return {
          cartItems: [...state.cartItems, newCartItem],
        };
      }




    }),
  removeCartItems: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((todo) => todo.id !== id),
    })),
  resetCartItems: (id) =>
    set((state) => ({
      cartItems: [],
    })),
  // updateCartItems: (id, updatedFields) => set((state) => ({
  //   cartItems: state.cartItems.map((todo) =>
  //     todo.id === id ? { ...todo, ...updatedFields } : todo
  //   ),
  // })),

  updateCartItems: (id, updatedFields) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        // ✅ Item exists → update it
        state.addNotification({ type: "success", title: "Cart updated", content: "" });

        return {
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, ...updatedFields } : item
          ),
        };
      } else {
        // ✅ Item does not exist → call addCartItems
        const newCartItem = { id, ...updatedFields };

        // Instead of duplicating code, reuse addCartItems
        state.addCartItems(newCartItem);

        return {}; // No direct update here, because addCartItems will handle it
      }
    }),





  // ✅ Add these for userDataX
  setUserDataX: (data) => set(() => ({ userDataX: data })),
  resetUserDataX: () => set(() => ({ userDataX: null })),
  updateUserDataX: (partialData) =>
    set((state) => ({
      userDataX: { ...state.userDataX, ...partialData },
    })),
}))
