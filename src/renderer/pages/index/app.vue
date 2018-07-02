<template>
  <section class="app">
    <template v-if="!$route.meta.hidden">
      <el-container class="app-body">
        <el-aside width="68px">
          <ul class="app-body__aside">
            <li class="app-body__aside-item app-body__aside-item_active">
              <i class="app-body__aside-item-icon el-icon-fa-product-hunt"></i>
              <strong class="app-body__aside-item-text">项目</strong>
            </li>
            <li class="app-body__aside-item">
              <i class="app-body__aside-item-icon el-icon-fa-align-left"></i>
              <strong class="app-body__aside-item-text">模板</strong>
            </li>
            <li class="app-body__aside-item">
              <i class="app-body__aside-item-icon el-icon-fa-cog"></i>
              <strong class="app-body__aside-item-text">设置</strong>
            </li>
            <li class="app-body__aside-item">
              <i class="app-body__aside-item-icon el-icon-fa-question-circle"></i>
              <strong class="app-body__aside-item-text">帮助</strong>
            </li>
          </ul>
          <!-- menu start -->
          <!-- <aside class="app-body__menu-wrapper">
            <el-menu
              :default-active="activeMenu"
              :unique-opened="uniqueOpened"
              class="app-body__menu-bar"
              router
            >
              <template
                v-for="(route, index) in $router.options.routes[$router.options.routes.length - 2].children"
              >
                <template v-if="route.children && route.name">
                  <el-submenu :index="route.name" :key="index">
                    <template slot="title"><i :class="route.iconClass"></i>{{route.title}}</template>
                    <el-menu-item
                      :index="cRoute.name"
                      v-for="(cRoute, cIndex) in route.children"
                      :key="cIndex"
                      v-if="!cRoute.hidden"
                      :route="cRoute"
                    >{{cRoute.title}}</el-menu-item>
                  </el-submenu>
                </template>
                <template v-if="!route.children && route.name">
                  <el-menu-item
                    :index="route.name"
                    :key="index"
                    :route="route"
                  ><i :class="route.iconClass"></i>{{route.title}}</el-menu-item>
                </template>
              </template>
            </el-menu>
          </aside> -->
          <!-- menu end -->
        </el-aside>
        <el-main>
          <!-- content start -->
          <div class="app-body__content-wrapper">
            <section class="app-body__content">
              <!-- <router-view></router-view> -->
            </section>
          </div>
          <!-- content end -->
        </el-main>
      </el-container>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </section>
</template>

<script>
import viewState from '@/util/view_state';
import avatarImg from '@/assets/img/avatar.png'

export default {
  data() {
    return {
      user: {
        username: '',
        avatar: avatarImg
      },
      activeMenu: '',
      uniqueOpened: true
    };
  },
  created() {
    this.activeMenu = this.$route.name;
    this.user = Object.assign({}, this.user, viewState.user);
  },
  watch: {
    '$route'(to, from) {
      this.activeMenu = this.$route.name;
    }
  },
  methods: {
    logout() {
      this.$confirm('确定要注销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        window.location.href = '/auth/logout';
      }).catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.app {
  .el-dropdown-menu {
    margin-top: 20px;
  }

  .avatar {
    border-radius: 50%;
  }

  .color-white {
    color: #fff;
  }
}

.app-body__aside {
  width: 68px;
  height: 100vh;
  box-sizing: border-box;
  background-color: #3080fe;
  color: #fff;
  padding-top: 35px;
}

.app-body__aside-item {
  position: relative;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  cursor: pointer;
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

// menu
.app-body__menu-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  background: red;
  height: 100%;
  overflow: auto;
  z-index: 98;
}

.app-body__menu-bar {
  height: 100%;
  flex-grow: 0;
  width: 200px;
}

// content
.app-body__content-wrapper {
  width: 100%;
  z-index: 97;
  box-sizing: border-box;
}
</style>
