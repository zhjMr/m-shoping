<template>
  <div class="Appheader">
    <!-- 头部logo -->
    <span class="headerLogo">
      <el-icon class="mr-1"><ElemeFilled /></el-icon>
      积云商城
    </span>
    <!-- 菜单展开或收起的图标 -->
    <el-tooltip effect="dark" content="菜单" placement="bottom">
      <el-icon class="icon-btn"><Fold /></el-icon>
    </el-tooltip>
    <!-- 全局刷新图标 -->
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefsh"><Refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto dropdown">
      <!-- 全屏图标 -->
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @clikc="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <!-- 下拉菜单 -->
      <el-dropdown class="dro" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout"> 退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { taost, showModel } from "@/composables/utils.js";
import { useRouter } from "vue-router";
import { useFullscreen } from "@vueuse/core";
// isFullscreen 是否是全屏 enter 进入全屏 exit退出全屏 toggle全屏切换
const { isFullscreen, enter, exit, toggle } = useFullscreen();
//初始化store
const store = useStore();
//初始化路由
const router = useRouter();
// 修改密码  退出登录
const handleCommand = (command) => {
  switch (command) {
    case "logout":
      // logout调用退出登录方法
      handleLogout();
      break;
    case "rePassword":
      // rePassword调用修改密码方法
      handleChangePass();
  }
};
//点击退出登录触发的方法
const handleLogout = () => {
  showModel("确定要退出登录吗 ?").then((response) => {
    //调用退出登录方法
    store.dispatch("loginOut").finally(() => {
      //消息提示
      taost("退出登录成功");
      //跳转登录页
      router.push("/login");
    });
  });
};
//点击修改密码触发的方法
const handleChangePass = () => {
  alert("修改密码");
};
//点击刷新触发的方法
const handleRefsh = () => {
  location.reload();
};
</script>
<style lang="postcss" scoped>
.Appheader {
  height: 64px;
  @apply flex bg-indigo-700 items-center fixed right-0 left-0 top-0 text-light-50;
}
.headerLogo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}
.icon-btn {
  width: 42px;
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center hover:bg-indigo-600;
}
.dropdown {
  @apply flex justify-center items-center;
}
.dro .el-dropdown-link {
  @apply mx-4 text-light-50 flex justify-center items-center;
}
</style>
