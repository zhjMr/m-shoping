<template>
    <el-row class="bg-indigo-500 min-h-screen">
        <el-col :span="16" class="flex justify-center items-center">
            <div>
                <div class="text-light-50 font-bold text-3xl mb-3 text-center">
                    欢迎光临
                </div>
                <div class="text-light-50 ">
                    《vue3 +vite》实战项目演示网站
                </div>
            </div>
        </el-col>
        <el-col :span="8" class="bg-light-50  flex justify-center items-center flex-col">
            <h2 class="text-3xl font-bold text-gray-800 ">欢迎回来</h2>
            <div class="my-5 text-gray-300 flex justify-center items-center space-x-2">
                <span class="h-[1px] w-16 bg-gray-200"></span>
                <span>账号密码登录</span>
                <span class="h-[1px] w-16 bg-gray-200"></span>
            </div>
            <el-form ref="ruleFormRef" class="w-[250px]" :model="ruleForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input prefix-icon="User" v-model="ruleForm.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="Lock" v-model="ruleForm.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button color="#626aef" round class="w-[250px]" @click="submitForm(ruleFormRef)">
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
const ruleFormRef = ref()
//点击登录的事件
const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid, fields) => {
        if (valid) {
            const response = await LoginApi.LoginFrom(data.ruleForm)
            console.log(response);
        } else {
            console.log('error submit!', fields)
        }
    })
}
const { ruleForm, rules } = toRefs(data)
</script>
<style  scoped>

</style>