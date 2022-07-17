<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 栅格布局 搜索框区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            @clear="getUserList"
            v-model="queryInfo.query"
            placeholder="请输入内容"
          >
            <el-button
              @click="getUserList"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="addDialogVisible = true" type="primary"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              @change="changeUserStatus(scope.row)"
              v-model="scope.row.mg_state"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template :slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <!-- 编辑按钮 -->
            <el-button type="warning" icon="el-icon-delete"></el-button>
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="分配角色"
              placement="top"
            >
              <!-- 分配角色按钮 -->
              <el-button type="danger" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 用户对话框 -->
      <el-dialog
        @close="addDialogClose"
        title="添加用户对话框"
        :visible.sync="addDialogVisible"
        width="50%"
      >
        <!-- 中间区域 -->
        <el-form
          ref="addFormRef"
          :model="addForm"
          :rules="addFormRules"
          label-width="70px"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="addForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input v-model="addForm.passWord"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getUserList, changeUserStatus } from "@/api";
export default {
  name: "User",
  data() {
    // 验证邮箱规则
    let checkEmail = (rule, value, callback) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };

    // 验证手机号正则
    let checkMobile = (rule, value, callback) => {
      const regMobile = /^[1][3-9][\d]{9}/;
      if (regMobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };
    return {
      // 请求用户信息参数
      queryInfo: {
        query: "",
        pagenum: 1, // 当前页码
        pagesize: 2, // 每页显示的数据
      },
      userList: [], // 用户列表
      total: 0, // 总数
      addDialogVisible: false, // 底部对话框
      // 添加用户表单
      addForm: {
        userName: "",
        passWord: "",
        email: "",
        mobile: "",
      },
      addFormRules: {
        userName: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度再3~10个字之间",
            trigger: "blur",
          },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码的长度再6~15个字之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      try {
        const { data: res } = await getUserList(this.queryInfo);
        if (res.meta.status !== 200) {
          return this.$message.error("获取用户列表失败");
        }
        this.userList = res.data.users;
        this.total = res.data.total;
      } catch (error) {
        console.log(error);
      }
    },
    // pageSize 改变时会触发
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // currentPage 改变时会触发
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听用户状态变化
    async changeUserStatus(userIfon) {
      console.log(userIfon);
      const { data: res } = await changeUserStatus(
        userIfon.id,
        userIfon.mg_state
      );
      if (res.meta.status !== 200) {
        userIfon.mg_state = !userIfon.mg_state;
        return this.$message.error("修改状态失败");
      }
      this.$message.success("修改数据成功");
    },
    // 用户对话框关闭触发
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },
  },
};
</script>

<style scoped lang="less">
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
