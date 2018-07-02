<template>
  <div class="cart">
    <h3>购物车</h3>
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <ul class="cart-list">
      <li class="cart-item" v-for="(product, index) in products" :key="index">
        {{ product.title }} - {{ product.price | currency }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <p><el-button :disabled="!products.length" size="mini" @click="checkout(products)">Checkout</el-button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      checkoutStatus: 'checkoutStatus',
      total: 'cartTotalPrice'
    })
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('checkout', products);
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-list {
  padding-left: 8px;
}

.cart-item {
  list-style: none;
  margin-bottom: 8px;
}
</style>
