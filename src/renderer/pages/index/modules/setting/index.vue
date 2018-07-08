<template>
  <div class="setting-wrap">
    <div class="setting-box">
      <el-form v-if="setting" class="setting-form" ref="form" :model="setting" label-width="80px" size="mini">
        <h6 class="setting-box__title">通用</h6>
        <div class="setting-child-box">
          <el-form-item label="模板仓库">
            <el-input v-model="templateRepository"></el-input>
          </el-form-item>
          <el-form-item label="npm源">
            <el-select v-model="defaultNpmRegistry" placeholder="请选择">
              <el-option
                v-for="item in npmRegistry"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <h6 class="setting-box__title">编辑器</h6>
        <div class="setting-child-box">
          <el-form-item label="编辑器">
            <el-radio-group v-model="defaultEditor">
              <el-radio v-for="(item, index) in editor" :key="index" :label="item.label">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="安装路径">
            <el-input v-model="editorBasePath" disabled>
              <!-- <el-button @click="handleChangeInstallPath" slot="append" icon="el-icon-fa-folder-open-o"></el-button> -->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
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
  created() {
    
  },
  computed: {
    ...mapGetters({
      setting: 'setting/setting',
      npmRegistry: 'setting/npmRegistry',
      editor: 'setting/editor'
    }),
    editorBasePath: {
      get() {
        return this.$store.state.setting.setting.editorBasePath;
      }
    },
    templateRepository: {
      get() {
        return this.$store.state.setting.setting.templateRepository;
      },
      set(value) {
        this.$store.dispatch('setting/updateSetting', { key: 'templateRepository', value });
      }
    },
    defaultNpmRegistry: {
      get() {
        return this.$store.state.setting.setting.defaultNpmRegistry;
      },
      set(value) {
        this.$store.dispatch('setting/updateSetting', { key: 'defaultNpmRegistry', value });
      }
    },
    defaultEditor: {
      get() {
        return this.$store.state.setting.setting.defaultEditor;
      },
      set(value) {
        this.$store.dispatch('setting/changeEditor', value);
      }
    }
  },
  methods: {
    handleChangeInstallPath() {
      
    },
    handleSubmit() {
      this.$store.dispatch('setting/saveSetting').then((result) => {
        if (result.success) {
          this.$message.success('保存成功');
        } else {
          this.$message.error(result.message);
        }
      });
    },
    handleReset() {
      this.$confirm('此操作将重置所有配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('setting/resetSetting').then((result) => {
          if (result.success) {
            this.$message.success('重置成功');
          } else {
            this.$message.error(result.message);
          }
        });
      }).catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.setting-wrap {
  height: 100vh;
  box-sizing: border-box;
  padding: 30px;
  background-color: #fff;
}
.setting-box {

}
.setting-box__title {
  padding-top: 8px;
  padding-bottom: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}
.setting-form {
  
}
.setting-child-box {
  width: 60%;
}
</style>


