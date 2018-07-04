<template>
  <section class="app">
    <template v-if="!$route.meta.hidden">
      <el-container class="app-body">
        <el-aside width="68px">
          <ul class="app-body__aside">
            <li
              v-for="(route, index) in $router.options.routes[$router.options.routes.length - 2].children"
              :key="index"
              :class="{'app-body__aside-item_active': activeRoute.name === route.name}"
              @click="handleVisit(route)"
              class="app-body__aside-item"
            >
              <i class="app-body__aside-item-icon" :class="[route.meta.icon || '']"></i>
              <strong class="app-body__aside-item-text">{{route.meta.title}}</strong>
            </li>
          </ul>
        </el-aside>
        <el-main class="app-body__main">
          <div class="app-body__content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </section>
</template>

<script>

export default {
  data() {
    return {
      activeRoute: {}
    };
  },
  created() {
    this.activeRoute = this.$route.matched[1] || {};
  },
  watch: {
    '$route'(to, from) {
      this.activeRoute = this.$route.matched[1] || {};
    }
  },
  methods: {
    handleVisit(route) {
      this.$router.push({ name: route.name });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-body__main {
  padding: 0;
}

.app-body__aside {
  width: 68px;
  height: 100vh;
  box-sizing: border-box;
  // background-color: #3080fe;
  background-color: #171415;
  color: rgba(255, 255, 255, .7);
  padding-top: 35px;
}

.app-body__aside-item {
  position: relative;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
}

.app-body__aside-item_active {
  &:before {
    content: '';
    display: block;
    width: 4px;
    height: 36px;
    position: absolute;
    top: 10px;
    left: 0;
    border-radius: 2px;
    background-color: #fff;
  }
  color: #fff;
}

.app-body__aside-item-icon {
  display: inline-block;
}

.app-body__aside-item-text {
  display: block;
  padding-top: 8px;
  text-align: center;
  font-size: 12px;
}

.app-body__content {
  height: 100vh;
  overflow-y: scroll;
}
</style>
