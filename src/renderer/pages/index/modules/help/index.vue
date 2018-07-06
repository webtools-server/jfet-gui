<template>
  <div class="help-wrap">
    <div class="help-box">
      <h6 class="help-box__title">关于jfet</h6>
      <p class="help-box__content">
        jfet 为「加油宝」内部的前端构建和工程化工具。项目开发周期中每一个阶段基本都有一个插件，并且允许对特定的业务封装解决方案，目的是简化并统一开发人员的日常构建与开发相关的工作。
      </p>
    </div>
    <div class="help-box">
      <h6 class="help-box__title">jfet特性</h6>
      <p class="help-box__content">
        1. 统一命令，任何基于 jfet 的工程，都具备简单、一致的命令行接口，易于开发人员使用。<br>
        2. 插件化，采用插件化设计，每个插件对应一个命令，封装常用功能，易于扩展。<br>
        3. 解决方案，提供封装解决方案的能力，可以整合底层插件适配某类业务场景，提升开发效率。<br>
      </p>
    </div>
    <div class="help-box">
      <h6 class="help-box__title">相关链接</h6>
      <p class="help-box__content">
        <el-button @click="handleVisitJfetWebsite" type="text" size="mini">jfet官方网站</el-button>
        <el-button @click="handleVisitJfetApiDoc" type="text" size="mini">jfet API文档</el-button>
      </p>
    </div>
  </div>
</template>
<script>
import * as helper from '@/util/helper';
import mainGlobal from '@/util/main_global';

const { JFET_WEBSITE_URL, JFET_API_DOC_URL } = mainGlobal.constants;

export default {
  methods: {
    handleVisitJfetWebsite() {
      helper.openExternal(JFET_WEBSITE_URL);
    },
    handleVisitJfetApiDoc() {
      helper.openExternal(JFET_API_DOC_URL);
    }
  }
}
</script>
<style lang="scss" scoped>
.help-wrap {
  height: 100vh;
  box-sizing: border-box;
  padding: 30px;
  background-color: #fff;
}
.help-box {
  margin-bottom: 20px;
}
.help-box__title {
  padding-top: 8px;
  padding-bottom: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
  font-size: 14px;
  font-weight: bold;
}
.help-box__content {
  line-height: 1.5;
  font-size: 14px;
}
</style>


