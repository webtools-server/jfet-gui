<template>
  <div class="project-wrapper">
    <!-- 暂无项目 -->
    <div class="no-project" v-if="projects.length === 0">
      <p class="no-project__desc">暂无项目，请先打开项目或创建项目</p>
      <div class="no-project__section">
        <el-button @click="handleOpenProject" round icon="el-icon-fa-folder-open-o" size="mini">打开项目</el-button>
        <el-button round type="primary" icon="el-icon-fa-plus" size="mini" @click="handleNewProject">创建项目</el-button>
      </div>
    </div>
    <!-- 项目列表 -->
    <div class="project-list" v-if="projects.length > 0">
      <div class="project-list__head clearfix">
        <strong class="ui-fl-l ui-pl-20">项目总数：{{projects.length}}</strong>
        <div class="ui-fl-r">
          <el-button @click="handleOpenProject" type="text" icon="el-icon-fa-folder-open-o" size="mini">打开项目</el-button>
          <el-button type="text" icon="el-icon-fa-plus" size="mini" @click="handleNewProject">创建项目</el-button>
        </div>
      </div>
      <div class="project-list__body">
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item, index) in projects" :key="index">
            <div class="ui-mb-14 project-list__item" @click="handleViewProject(item)">
              <strong class="project-list__item-title">{{item.name}}</strong>
              <p class="project-list__item-desc">{{item.path}}</p>
              <div class="operate-box">
                <i @click.stop="handleDeleteProject(item)" class="el-icon-delete"></i>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import * as helper from '@/util/helper';

export default {
  data() {
    return {};
  },
  computed: mapGetters({
    projects: 'project/projectList'
  }),
  created() {
    this.$store.dispatch('project/initProjectList');
  },
  methods: {
    handleNewProject() {
      this.$router.push({ path: '/template/index' });
    },
    handleOpenProject() {
      this.$store.dispatch('project/openProject');
    },
    handleDeleteProject(item) {
      this.$confirm('此操作将删除该项目, 但是不删除文件，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('project/deleteProject', item);
      }).catch(() => {});
    },
    handleViewProject(item) {
      this.$router.push({
        path: '/project/detail',
        query: {
          path: encodeURIComponent(item.path)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.no-project {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.no-project__desc {
  margin-bottom: 16px;
  text-align: center;
}

.no-project__section {
  text-align: center;
}

.project-list__head {
  height: 50px;
  line-height: 50px;
  background-color: #fcfcfc;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  color: #666;
  text-align: right;
  padding-right: 20px;
}

.project-list__body {
  padding: 20px;
}

.project-list__item {
  position: relative;
  border-radius: 4px;
  background-color: #fff;
  height: 100px;
  padding-left: 8px;
  padding-right: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    .operate-box {
      opacity: 1;
    }
  }
}

.project-list__item-title {
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

.project-list__item-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.operate-box {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 9;
  opacity: 0;
  transition: opacity .5s ease-out;
}
</style>


