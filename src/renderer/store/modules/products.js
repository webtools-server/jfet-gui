import * as shop from '@/api/shop';

// initial state
const initialState = {
  all: []
};

// getters
const initialGetters = {
  allProducts: state => state.all
};

// actions
const actions = {
  getAllProducts({ commit }) {
    shop.getProductList().then((products) => {
      if (products.code === 0) {
        commit('setProducts', products.data);
      }
    });
  }
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },

  decrementProductInventory(state, { id }) {
    const product = state.all.find(p => p.id === id);
    product.inventory--;
  }
};

export default {
  state: initialState,
  getters: initialGetters,
  actions,
  mutations
};
