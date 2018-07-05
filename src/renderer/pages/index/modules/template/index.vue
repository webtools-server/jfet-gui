<template>
  <div class="template-list" v-loading="loading">
    <div class="template-list__body">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in templates" :key="index">
          <div class="ui-mb-14 template-list__item">
            <strong class="template-list__item-title">{{item.name}}</strong>
            <p class="template-list__item-desc">{{item.description}}</p>
            <div class="operate-box">
              <el-button type="primary" size="mini" round @click="handleCreateProject(item)">创建项目</el-button>
              <el-button size="mini" round @click="handleViewTemplate(item)">模板详情</el-button>
              <!-- <i @click.stop="handleDeleteProject(item)" class="el-icon-delete"></i> -->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import * as helper from '@/util/helper';

export default {
  data() {
    return {
      loading: true
    };
  },
  computed: mapGetters({
    templates: 'template/templates'
  }),
  created() {
    this.$store.dispatch('template/fetchTemplate').then(() => {
      this.loading = false;
    });
  },
  methods: {
    handleCreateProject(item) {

    },
    handleViewTemplate(item) {
      helper.openExternal(item.web_url);
    }
  }
}
</script>
<style lang="scss" scoped>
.template-list__body {
  padding: 20px;
}

.template-list__item {
  position: relative;
  border-radius: 4px;
  background-color: #fff;
  height: 140px;
  padding-left: 8px;
  padding-right: 8px;
  overflow: hidden;
}

.template-list__item-title {
  display: block;
  box-sizing: border-box;
  height: 28px;
  line-height: 28px;
  margin-bottom: 8px;
  border-bottom: 1px solid #ececec;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.template-list__item-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.operate-box {
  position: absolute;
  width: 100%;
  bottom: 6px;
  left: 0;
  z-index: 9;
  text-align: center;
}
</style>


