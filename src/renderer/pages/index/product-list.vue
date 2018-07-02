<template>
  <div class="product-list">
    <el-table
      :data="products"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="价格">
        <template slot-scope="scope">
          <span>{{ scope.row.price | currency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            :disabled="!scope.row.inventory"
            @click="addProductToCart(scope.row)">Add to cart</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: mapActions([
    'addProductToCart'
  ]),
  created () {
    this.$store.dispatch('getAllProducts');
  }
}
</script>