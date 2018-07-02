<template>
  <section class="app">
    <template v-if="!$route.meta.hidden">
      <el-container>
        <el-header>
          <!-- header start  -->
          <header class="app-header">
            <router-link class="app-header__logo" :to="{path: '/'}">template</router-link>
            <div class="app-header__user-info" v-if="user.username">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link color-white">
                  {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="el-dropdown-link">
                <img class="avatar" :src="user.avatar">
              </span>
            </div>
          </header>
          <!-- header end  -->
        </el-header>
        <el-container class="app-body">
          <el-aside width="200px">
            <!-- menu start -->
            <aside class="app-body__menu-wrapper">
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
            </aside>
            <!-- menu end -->
          </el-aside>
          <el-main>
            <!-- content start -->
            <div class="app-body__content-wrapper">
              <section class="app-body__content">
                <router-view></router-view>
              </section>
            </div>
            <!-- content end -->
          </el-main>
        </el-container>
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
// header
.app-header {
  width: 100%;
  height: 60px;
  background: #324157;
  padding: 13px 20px;
  box-sizing: border-box;
  color: #ffffff;
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
}

.app-header__logo {
  font-size: 2.4rem;
}

.app-header__user-info {
  float: right;

  img {
    width: 25px;
    height: 25px;
    vertical-align: -7px;
    margin: 0 0 0 10px;
    cursor: pointer;
  }
}

// menu
.app-body__menu-wrapper {
  position: fixed;
  left: 0;
  top: 60px;
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
