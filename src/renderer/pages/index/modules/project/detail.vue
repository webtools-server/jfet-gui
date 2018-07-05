<template>
  <div class="project-detail">
    <div class="project-detail__head clearfix">
      <div class="project-detail__head-back ui-fl-l"><i @click="handleBackProjectList" class="el-icon-arrow-left"></i></div>
      <strong class="project-detail__head-title ui-fl-l">
        {{project.name || ''}}&nbsp;
        <el-tooltip class="item" effect="dark" :content="project.path || ''" placement="right">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </strong>
      <div class="ui-fl-r">
        <el-button @click="handleProjectSetting" type="text" icon="el-icon-fa-wrench" size="mini">配置</el-button>
        <el-button @click="handleInstallDeps" type="text" icon="el-icon-fa-linode" size="mini">安装依赖</el-button>
        <el-button @click="handleOpenEditor" type="text" icon="el-icon-fa-code" size="mini">编辑器</el-button>
        <!-- <el-button @click="handleOpenTerminal" type="text" icon="el-icon-fa-terminal" size="mini">终端</el-button> -->
        <el-button @click="handleOpenFolder" type="text" icon="el-icon-fa-folder-open-o" size="mini">文件夹</el-button>
      </div>
    </div>
    <div class="project-detail__command">
      <el-button
        v-for="(item, index) in commands"
        :key="index"
        @click="handleRunCommand(item)"
        type="text"
        size="mini"
        icon="el-icon-fa-play-circle">{{item.name}}</el-button>
    </div>
    <div class="project-detail__body">
      <terminal :project="project"></terminal>
    </div>
    <el-dialog
      class="project-detail__setting"
      title="项目配置"
      fullscreen
      :visible.sync="projectSettingDialogVisible">
      <div>
        <el-tabs>
          <el-tab-pane label="命令配置">
            <el-table
              :data="commands"
              border
              stripe
              size="mini"
              style="width: 100%">
              <el-table-column prop="key" label="key" width="140"></el-table-column>
              <el-table-column prop="name" label="名称" width="180"></el-table-column>
              <el-table-column prop="command" label="命令"></el-table-column>
            </el-table>
            <!-- <div class="ui-pt-14 ui-ta-r">
              <el-button icon="el-icon-fa-refresh" size="mini">同步</el-button>
              <el-button type="primary" icon="el-icon-fa-floppy-o" size="mini">保存</el-button>
            </div> -->
          </el-tab-pane>
          <el-tab-pane label="依赖管理">
            <el-table
              :data="dependencies"
              border
              stripe
              size="mini"
              style="width: 100%">
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="version" label="版本"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import * as helper from '@/util/helper';
import Terminal from '@/components/terminal.vue';
import terminal from '@/util/terminal';

export default {
  data() {
    return {
      project: {},
      projectSettingDialogVisible: false
    };
  },
  components: {
    Terminal
  },
  computed: mapGetters({
    commands: 'project/commands',
    dependencies: 'project/dependencies'
  }),
  async created() {
    const pathname = decodeURIComponent(this.$route.query.path);
    // 查询项目
    const project = await this.$store.dispatch('project/queryProject', pathname);
    // 初始化项目
    this.$store.dispatch('project/initProject', project);
    this.project = project || {};
  },
  mounted() {
    
  },
  methods: {
    handleProjectSetting() {
      this.projectSettingDialogVisible = true;
    },
    handleOpenEditor() {
      helper.openEditor(this.project.path).then(this.onFulfilled);
    },
    handleOpenTerminal() {
      helper.openTerminal(this.project.path).then(this.onFulfilled);
    },
    handleOpenFolder() {
      helper.openFolder(this.project.path);
    },
    handleInstallDeps() {
      terminal.writeTerminal(this.project.path, 'npm i' + '\r\n');
    },
    handleRunCommand(item) {
      terminal.writeTerminal(this.project.path, item.command + '\r\n');
      console.log(item);
    },
    onFulfilled(result) {
      if (!result.success) {
        this.$notify.error({
          title: '错误',
          message: result.message
        });
      }
    },
    handleBackProjectList() {
      this.$router.push({ path: '/project/index' });
    }
  }
}
</script>
<style lang="scss" scoped>
.project-detail__head {
  height: 50px;
  box-sizing: border-box;
  line-height: 50px;
  background-color: #fcfcfc;
  border-bottom: .5px solid #e0e0e0;
  font-size: 12px;
  color: #666;
  text-align: right;
  padding-right: 20px;
}
.project-detail__head-back {
  padding-left: 12px;
  padding-right: 12px;
  font-size: 16px;
  i {
    cursor: pointer;
    &:hover {
      color: #409EFF;
    }
  }
}
.project-detail__head-title {
  font-size: 14px;
  font-weight: bold;
}
.project-detail__command {
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 40px;
  background-color: #fcfcfc;
  color: #666;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  text-align: center;
}
.project-detail__body {
  box-sizing: border-box;
  height: calc(100vh - 90px);
  padding: 8px;
  background-color: rgba(0, 0, 0, .85);
}
.project-detail__setting {
  .el-dialog__header {
    padding: 10px;
  }
  .el-dialog__body {
    padding: 0 14px 14px 14px;
  }
}
</style>