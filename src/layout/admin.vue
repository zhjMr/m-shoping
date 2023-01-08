<template>
  <div>
    <el-container>
      <el-header>
        <AppHeader></AppHeader>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <AppAside></AppAside>
        </el-aside>
        <el-main>
          <navigation></navigation>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import AppHeader from "@/layout/components/AppHeader.vue"; //头部header
import AppAside from "@/layout/components/AppAside.vue"; //侧边菜单
import navigation from "@/layout/components/navigation.vue"; //导航栏展示
</script>

<style scoped></style>
