<script setup>
import DesignImage from '@/components/DesignImage.vue';
import DesignSetting from '@/components/DesignSetting.vue';
import MoreApp from '@/components/MoreApp.vue';
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <DesignImage />
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <DesignSetting />
      <MoreApp class="Objection-Card"/>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.Objection-Card {
  display: block;          
  margin: 20px auto 0;     
  width: fit-content;     
}

@media screen and (min-width: 768px) {
  .el-col {
    margin-bottom: 0;
  }
}
</style>