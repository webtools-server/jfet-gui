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
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      class="create-project"
      title="创建项目"
      width="60%"
      :close-on-click-modal="false"
      :visible.sync="createProjectDialogVisible">
      <div class="create-project-wrap">
        <el-form ref="projectForm" :model="projectForm" :rules="projectValidRules" label-width="110px" size="mini">
          <el-form-item label="当前模板">
            <span>{{projectForm.templateName}}</span>
          </el-form-item>
          <el-form-item label="安装路径" prop="installPath">
            <el-input v-model="projectForm.installPath" disabled>
              <el-button @click="handleChangeInstallPath" slot="append" icon="el-icon-fa-folder-open-o"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="项目目录名" prop="name">
            <el-input v-model="projectForm.name" placeholder="请输入项目目录名"></el-input>
          </el-form-item>
          <el-form-item label="项目别名" prop="alias">
            <el-input v-model="projectForm.alias" placeholder="请输入项目别名"></el-input>
          </el-form-item>
          <el-form-item label="清空目录">
            <el-switch v-model="projectForm.force"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleProjectCreate">立即创建</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import * as helper from '@/util/helper';
import mainGlobal from '@/util/main_global';
import path from 'path';

const { DEFAULT_PROJECT_PATH } = mainGlobal.constants;

export default {
  data() {
    return {
      createProjectDialogVisible: false,
      projectForm: {
        templateName: '',
        templateUrl: '',
        installPath: DEFAULT_PROJECT_PATH,
        name: '',
        alias: '',
        force: false
      },
      loading: true,
      projectValidRules: {
        installPath: [
          { required: true, message: '安装路径不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '项目目录名不能为空', trigger: 'blur' }
        ]
      }
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
    handleChangeInstallPath() {

    },
    handleProjectCreate() {
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          // 真实路径
          const realPath = path.join(this.projectForm.installPath, this.projectForm.name);
          // 添加项目
          this.$store.dispatch('project/addProject', {
            name: this.projectForm.name,
            path: realPath,
            template: { // 模板
              name: this.projectForm.templateName,
              url: this.projectForm.templateUrl,
              force: this.projectForm.force
            }
          }).then((result) => {
            if (result.success) {
              // 先创建目录
              helper.ensureDirSync(realPath);
              // 跳转项目详情页面，并执行init命令
              this.$router.push({
                path: '/project/detail',
                query: {
                  path: encodeURIComponent(realPath),
                  init: true
                }
              });
            } else {
              this.$notify.error({
                title: '错误',
                message: result.message
              });
            }
          });
        }
      });
    },
    handleCancel() {
      this.createProjectDialogVisible = false;
    },
    handleCreateProject(item) {
      this.projectForm.templateName = item.name;
      this.projectForm.templateUrl = item.http_url_to_repo;
      this.createProjectDialogVisible = true;
    },
    handleViewTemplate(item) {
      helper.openExternal(item.web_url);
    }
  }
}
</script>
<style lang="scss" scoped>
.template-list {
  height: 100vh;
  overflow-y: scroll;
}

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

.create-project-wrap {
  width: 90%;
}
</style>


