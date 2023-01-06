<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div class="login-welcome">
                    欢迎光临
                </div>
                <div class="power">
                    《vue3 +vite》实战项目演示网站
                </div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="right-welcome">欢迎回来</h2>
            <div class="userpass">
                <span class="wire"></span>
                <span>账号密码登录</span>
                <span class="wire"></span>
            </div>
            <el-form ref="ruleFormRef" class="dynamic" :model="ruleForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input prefix-icon="User" v-model.trim="ruleForm.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="Lock" v-model.trim="ruleForm.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" color="#626aef" round class="dynamic"
                        @click="submitForm(ruleFormRef)">
                        登 录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script setup>
import LoginApi from "@/api/login.js"

import { reactive, ref, toRefs } from "vue"

import { setToken } from '@/composables/auth.js'

import { useRouter } from "vue-router"

import { useStore } from "vuex"

import { taost } from '@/composables/utils.js'

const data = reactive({
    //表单数据
    ruleForm: {
        username: "",//用户名
        password: "",//密码
    },
    //表单校验
    rules: {
        username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
    }
})


//初始化路由
const router = useRouter()

//初始化store
const store = useStore()

const ruleFormRef = ref()

//初始化loading状态
const loading = ref(false)

//点击登录触发的事件
const submitForm = (formEl) => {
    formEl.validate((valid) => {
        if (!valid) return
        //开启登录按钮loading
        loading.value = true
        LoginApi.LoginFrom(data.ruleForm).then((response) => {
            //登录成功进行提示
            // console.log(response);
            taost('登录成功', 'success')
            //存储token信息
            setToken(response.token)
            //存储用户信息
            LoginApi.userInfo().then((response) => {
                // console.log(response, '用户信息');
                store.commit('USERINFO', response)
            })
            //登录成功跳转到首页
            router.push('/')

        }).finally(() => {
            //关闭登录按钮loading提示
            loading.value = false
        })
    })
}
const { ruleForm, rules } = toRefs(data)
</script>
<style lang="postcss" scoped>
.login-container {
    @apply bg-indigo-500 min-h-screen;
}

.login-container .left {
    @apply flex justify-center items-center;
}

.login-container .left .login-welcome {
    @apply text-light-50 font-bold text-3xl mb-3 text-center;
}

.login-container .left .power {
    @apply text-light-50;
}

.login-container .right {
    @apply bg-light-50 flex justify-center items-center flex-col;
}

.login-container .right .right-welcome {
    @apply text-3xl font-bold text-gray-800;
}

.login-container .right .userpass {
    @apply my-5 text-gray-300 flex justify-center items-center space-x-2;
}

.login-container .right .userpass .wire {
    @apply h-[1px] w-16 bg-gray-200;
}

.login-container .right .dynamic {
    @apply w-[250px];
}
</style>