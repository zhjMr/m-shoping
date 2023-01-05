<template>
    <div>
        <el-container class="min-h-screen">
            <el-header class="bg-indigo-700 h-[64px]">
                <AppHeader />
            </el-header>
            <el-container>
                <el-aside width="250px" class="bg-light-50">
                    <AppAside />
                </el-aside>
                <el-main class="bg-gray-100">
                    <AppMain />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import AppHeader from '@/layout/AppHeader/index.vue' //头部header
import AppAside from '@/layout/AppAside/index.vue'  //侧边菜单
import AppMain from '@/layout/AppMain/index.vue'     //中间展示
</script>

<style scoped>

</style>