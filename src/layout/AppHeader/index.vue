<template>
    <div class="flex items-center justify-between h-[64px]">
        <div class="flex items-center   text-light-50 font-extralight" style="font-size: 20px;">
            <div class="mx-13 flex items-center">
                <el-icon>
                    <ElemeFilled />
                </el-icon>
                <div class="ml-1">积云商城</div>
            </div>
            <div class=" px-3 py-4 ml-6 hover:bg-indigo-600">
                <el-icon size="16">
                    <Fold />
                </el-icon>
            </div>
            <div class="px-3  py-4 hover:bg-indigo-600">
                <el-icon size="16">
                    <Refresh />
                </el-icon>
            </div>

        </div>
        <div>
            <el-dropdown @command="handleCommand" class="ml-4">
                <div class="flex items-center  text-light-50 h-[64px]">
                    <div class="px-3 py-6  mr-8 hover:bg-indigo-600">
                        <el-icon color="#fff" size="16">
                            <FullScreen />
                        </el-icon>
                    </div>
                    <img class="w-6  h-6 rounded-full "
                        src="http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/62af03d1b2aeb.jpg" />
                    <div class="mx-2">admin</div>
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import LoginApI from '@/api/login.js'
import { useStore } from 'vuex'
import { taost } from "@/composables/utils.js"
import { useRouter } from 'vue-router'
//初始化store
const store = useStore()
//初始化路由
const router = useRouter()
// 修改密码  退出登录
const handleCommand = (e) => {
    console.log(e);
    // 退出登录
    if (e === "logout") {
        handleLogout();
    } else {
        //修改密码
        handleChangePass();
    }
};
//点击退出登录触发的方法
const handleLogout = () => {

    //调用退出登录方法
    store.dispatch('loginOut').finally(() => {
        //消息提示
        taost('退出登录成功')
        //跳转登录页
        router.push('/login')
    })
}
//点击修改密码触发的方法
const handleChangePass = () => {
    alert('修改密码')
}

</script>
<style scoped >

</style>