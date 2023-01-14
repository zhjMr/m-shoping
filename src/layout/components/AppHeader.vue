<template>
  <div class="Appheader">
    <!-- 头部logo -->
    <span class="headerLogo">
      <el-icon class="mr-1"><ElemeFilled /></el-icon>
      积云商城
    </span>
    <!-- 菜单展开或收起的图标 -->
    <el-tooltip effect="dark" content="菜单" placement="bottom">
      <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')" >
        <Fold v-if="$store.state.asideWitch=='250px'"/>
        <Expand  v-else/>
      </el-icon>
    </el-tooltip>
    <!-- 全局刷新图标 -->
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefsh"><Refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto dropdown">
      <!-- 全屏图标 -->
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
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
  <!-- 抽屉 -->
  <FromDrawer
    ref="fromDrawerRef"
    @submitForm="submitForm"
    title="修改密码"
    destroyedOnClose
  >
    <el-form
      ref="ruleFormRef"
      class="dynamic"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      label-position="right"
      size="small"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input
          v-model.trim="ruleForm.oldpassword"
          placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input v-model.trim="ruleForm.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          v-model.trim="ruleForm.repassword"
          placeholder="请输入确认密码"
        />
      </el-form-item>
    </el-form>
  </FromDrawer>
</template>
<script setup>
import { useStore } from "vuex";

import { taost, showModel } from "@/composables/utils.js";

import { useRouter } from "vue-router";

import { useFullscreen } from "@vueuse/core";

import { ref, reactive, toRefs } from "vue";

import FromDrawer from "@/components/FromDrawer.vue";

import loginApi from "@/api/login.js";
const data = reactive({
  //表单数据
  ruleForm: {
    oldpassword: "", //旧密码
    password: "", //新密码
    repassword: "", //确认密码
  },
  //表单校验
  rules: {
    oldpassword: [
      { required: true, message: "旧密码不能为空", trigger: "blur" },
    ],
    password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],

    repassword: [
      { required: true, message: "确认密码不能为空", trigger: "blur" },
    ],
  },
});

//初始化store
const store = useStore();

//初始化路由
const router = useRouter();

// isFullscreen 是否是全屏 enter 进入全屏 exit退出全屏 toggle全屏切换
const { isFullscreen, toggle } = useFullscreen();

//控制抽屉的状态
const Showdrawer = ref(false);

//初始化loading状态
const loading = ref(false);

const ruleFormRef = ref(null);

const fromDrawerRef = ref(null);
// 修改密码  退出登录
const handleCommand = (command) => {
  switch (command) {
    case "logout":
      // logout调用退出登录方法
      handleLogout();
      break;
    case "rePassword":
      // rePassword调用修改密码方法
      fromDrawerRef.value.open();
      break;
  }
};
//点击提交触发的事件
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (!valid) return;
    //开启提交按钮loading
    fromDrawerRef.value.showLoading();
    loginApi
      .updatepassword(data.ruleForm)
      .then((response) => {
        taost("修改密码成功,请重新登录");
        //清空本地和vuex数据
        store.dispatch("loginOut");
        //跳转登录
        router.push("/login");
      })
      .finally(() => {
        //成功或失败都关闭
        fromDrawerRef.value.hideLoading();
      });
  });
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

//点击刷新触发的方法
const handleRefsh = () => {
  location.reload();
};

const { ruleForm, rules } = toRefs(data);
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
