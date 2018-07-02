<template>
  <div>
    <div>
      <h3>产品列表：</h3>
      <product-list></product-list>
      <shopping-cart></shopping-cart>
    </div>
  </div>
</template>

<script>
import ProductList from './product-list.vue';
import ShoppingCart from './shopping-cart.vue';

export default {
  components: {
    ProductList,
    ShoppingCart
  }
}
</script>
