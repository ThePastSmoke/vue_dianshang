<template>
  <div class="login_container">
    <!-- 头像 -->
    <div class="login_box">
      <div class="avatar_box">
        <img src="@/assets/jielun.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :rules="rules"
        class="login_form"
        :model="loginForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { logining } from "@/api";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单验证规则
      rules: {
        // 验证用户名
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 重置表单
    reset() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    // 登录按钮
    login() {
      this.$refs.loginFormRef.validate(async (value) => {
        if (value) {
          try {
            const res = await logining(
              this.loginForm.username,
              this.loginForm.password
            );
            if (res.status === 200) {
              this.$store.commit("setUser", res.data.data.token);
              this.$router.push("/welcome");
              this.$message({
                message: "恭喜你，登录成功",
                type: "success",
              });
            } else {
              this.$message.error("用户名密码输入错误~");
            }
            console.log(res);
          } catch (error) {
            console.log(error);
            this.$message.error("用户名密码输入错误~");
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.login_container {
  position: relative;
  background: #2b4b6b;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      position: relative;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #ccc;
      }
    }
    .login_form {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
