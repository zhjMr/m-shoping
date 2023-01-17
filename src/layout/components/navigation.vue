<template>
  <div class="nav-list-bg" :style="{left:$store.state.asideWitch}">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      closable
      @tab-remove="removeTab"
      style="min-width: 100px;"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <span class="tag-drop">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-icon ><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">Action 1</el-dropdown-item>
            <el-dropdown-item command="b">Action 2</el-dropdown-item>
            <el-dropdown-item command="c">Action 3</el-dropdown-item>
            <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
            <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>
<script setup>
import { ref } from "vue";

let tabIndex = 2;
const editableTabsValue = ref("2");
const editableTabs = ref([
  {
    title: "Tab 1",
    name: "1",
    content: "Tab 1 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
]);
const handleCommand = (command) => {
  console.log(`click on item ${command}`);
};
const addTab = (targetName) => {
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    title: "New Tab",
    name: newTabName,
    content: "New Tab content",
  });
  editableTabsValue.value = newTabName;
};
const removeTab = (targetName) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>
<style scoped>
.nav-list-bg {
  height: 44px;
  top: 64px;
  right: 0;
  @apply bg-gray-100 flex items-center fixed px-2;
}
.tag-drop{
    @apply ml-auto bg-white px-2 flex justify-center items-center; 
    height: 32px;
}
:deep(.el-tabs__header){
   margin-bottom: 0;
   border: 0 !important;
}
:deep(.el-tabs__nav){
  border: 0 !important;
}
:deep(.el-tabs){
    --el-tabs-header-height: auto;
}
:deep(.el-tabs__item){
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white rounded mx-1;
}
:deep(.el-tabs__nav-prev) ,:deep(.el-tabs__nav-next){
    line-height: 32px;
}
:deep(.is-disabled){
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>
