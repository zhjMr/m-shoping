<template>
    <div class="login-container">
        <div class="welcome">
            欢迎光临
        </div>
        <div class="welcome-back">
            <div class="login-form">
                <h2 class="h2">欢迎回来</h2>
                <div>
                    <span class="line"></span>
                    <span class="user-pass">账号密码登录</span>
                    <span class="line"></span>
                </div>
                <div class="from-user">
                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
                        <el-form-item prop="username">
                            <el-input prefix-icon="User" v-model="ruleForm.username" placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input prefix-icon="Lock" type="password" v-model="ruleForm.password"
                                placeholder="请输入密码" />
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="submitForm(ruleFormRef)" class="btn-login">登录</el-button>
                        </el-form-item>
                    </el-form>

                </div>
            </div>
        </div>
    </div>
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
.login-container {
    width: 100%;
    height: 100%;
    display: flex;
}

.welcome {
    width: 66%;
    height: 100%;
    background-color: #6366f1;
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}

.h2 {
    font-size: 30px;
}

.welcome-back {
    width: 34%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #76f163; */
}

.login-form {
    text-align: center;
    /* background-color: aqua; */
}

.line {
    display: inline-block;
    --tw-bg-opacity: 1;
    background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
    height: 1px;
    width: 70px;
    margin: 4px;
}

.user-pass {
    color: #ccc;
}

.from-user {
    padding: 20px;
}

.el-input {
    width: 250px;
}

.btn-login {
    background-color: #6366f1;
    color: #fff;
    border-radius: 50px;
    width: 100%;
}
</style>