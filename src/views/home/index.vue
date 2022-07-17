<template>
  <el-container class="welcome_container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="@/assets/jielun.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏  -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle_button" @click="toggle_collapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          :default-active="activePath"
          router
          :collapse-transition="false"
          :collapse="isCollapse"
          :unique-opened="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="red"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span> {{ item.authName }} </span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path + ''"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span> {{ subItem.authName }} </span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenulist } from "@/api";
export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      // icon图标
      iconObj: {
        125: "iconfont icon-users",
        103: "iconfont icon-lock_fill",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isCollapse: false, // 是否折叠
      activePath: "", // 保存链接激活状态
    };
  },
  created() {
    this.getMenulist();
    // 页面开始加载给一个初始值
    this.activePath = sessionStorage.getItem("activePath");
  },
  methods: {
    // 退出按钮
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取导航栏数据
    async getMenulist() {
      const res = await getMenulist();
      if (res.data.meta.status !== 200)
        return this.$message.error(res.data.meta.msg);
      this.menuList = res.data.data;
    },
    // 是否折叠
    toggle_collapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接激活状态
    saveNavState(activePath) {
      sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style scoped lang="less">
.welcome_container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    background-color: #373d41;
    color: #fff;
    font-size: 22px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
      }
    }

    img {
      border-radius: 50%;
      width: 61px;
      height: 56px;
    }
  }
  .el-aside {
    background-color: #373d41;
    .el-menu {
      border-right: 0;
    }
    .toggle_button {
      width: 100%;
      height: 40px;
      background-color: #ff69b4;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      letter-spacing: 5px;
      color: #fff;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .iconfont {
    margin-right: 10px;
  }
}
</style>
