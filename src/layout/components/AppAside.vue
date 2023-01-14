<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo border-0"
    :style="{ width: $store.state.asideWitch }"
    :collapse="isCollapse"
    :collapse-transition="false"
    unique-opened
    router
  >
    <template v-for="(item, index) in asideMenus" :key="index">
      <el-sub-menu
        :index="item.name"
        v-if="item.child && item.child.length > 0"
      >
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(ele, index2) in item.child"
          :key="index2"
          :index="ele.frontpath"
        >
          <el-icon>
            <component :is="ele.icon"></component>
          </el-icon>
          <span>{{ ele.name }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item :index="item.frontpath" v-else>
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup>
import { computed, ref, reactive } from "vue";

import { useStore } from "vuex";

import { useRoute, onBeforeRouteUpdate } from "vue-router";

//初始化store
const store = useStore();

//初始化route
const route = useRoute();

//模拟菜单数据
const asideMenus = computed(() => store.state.menus);

//设置菜单默认选中项
const defaultActive = ref(route.path);

//路由变换的钩子函数
onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.psth;
});

//控制菜单展开与收起
const isCollapse = computed(() => !(store.state.asideWitch == "250px"));
</script>
<style lang="postcss" scoped>
.el-menu-vertical-demo {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md bg-light-50 fixed;
}
.el-menu-vertical-demo::-webkit-scrollbar {
  width: 0px;
}
</style>
