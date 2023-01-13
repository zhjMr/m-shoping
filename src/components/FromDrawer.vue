<template>
  <el-drawer
    v-model="Showdrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyedOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" :loading="loading" @click="submitForm">{{
          confirmText
        }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "45%",
  },
  destroyedOnClose: {
    type: Boolean,
    default: false,
  },
  //按钮
  confirmText: {
    type: String,
    default: "提交",
  },
});

//设置弹窗默认状态
const Showdrawer = ref(false);

//定义loading加载状态
const loading = ref(false);
//弹窗开启的方法
const open = () => {
  Showdrawer.value = true;
};
//弹窗关闭的方法
const close = () => {
  Showdrawer.value = false;
};
// 显示loading
const showLoading = () => {
  loading.value = true;
};
// 隐藏loading
const hideLoading = () => {
  loading.value = false;
};
//提交按钮方法
const emit = defineEmits(["submitForm"]);
const submitForm = () => {
  emit("submitForm");
};
//实例方法暴露
defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
});
</script>
<style lang="postcss" scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}
.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;

  overflow-y: auto;
}
.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
