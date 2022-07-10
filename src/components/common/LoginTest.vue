<template>
  <div id="login">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px">
        <!-- 输入用户名 -->
        <el-form-item label="用户名" prop="username" :rules="[
          { required: true, message: '请输入用户名', trigger: 'blue' },
          {
            min: 4,
            max: 10,
            message: '长度在4-10位字符之间',
            trigger: 'blur',
          },
        ]">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 输入密码 -->
        <el-form-item label="密码" prop="password" :rules="[
          { required: true, message: '请输入密码', trigger: 'blue' },
          {
            min: 6,
            max: 12,
            message: '长度在6-12位字符之间',
            trigger: 'blur',
          },
        ]">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 输入验证码 -->
        <el-form-item label="验证码">
          <div class="verCode">
            <el-input type="text" v-model="form.iptStr" style="width: 80px; margin-right: 10px" placeholder="验证码" />
            <div class="show">
              <span v-for="(num, index) in nums" :key="index" :style="style[index]">{{ num }}</span>
            </div>
            <a href="javascript:;" @click="setRandomNum">换一张</a>
          </div>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button @click="login('form')">登录</el-button>
          <el-button @click="clearFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>


export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        iptStr: "",
      },
      // 验证码数
      nums: [],
      // 验证码样式
      style: [],
    };
  },
  computed: {
    // 将 生成的验证码数组 转换为 字符串
    numsStr() {
      return this.nums.join("");
    },
  },
  methods: {
    // 定义一个 函数
    // 获得 生成随机数的函数
    // form~to 为随机数的取值范围
    getRandom(form, to) {
      return Math.round(Math.random() * (to - form) + form);
    },
    // 登录
    login(form) {
      // console.log(this.$refs);
      // 若信息没有填充完整 弹出提示
      let formData = this.form;
      if (
        formData.username.trim().length == 0 ||
        formData.password.trim().length == 0 ||
        formData.iptStr.trim().length == 0
      )
        return this.$message.error("您需要填写完整的登录信息！");
      // 判断 验证码是否输入 正确
      if (formData.iptStr !== this.numsStr)
        return this.$message.error("验证码错误！");
      // 信息填充完整后 发送请求 验证 用户名和密码

      // *****这里的写法不要想太多，这是elementui官方的写法
      this.$refs[form].validate((valid) => {
        console.log(this.axiosPro);
        if (valid) {
          this.axiosPro.post('/login', formData)
            .then(
              (res) => {
                console.log(res);
                // 请求成功
                if (res.data.status == 200) {
                  this.$router.push("/home");
                }
                this.$message({ message: res.data.message, type: 'success' })
              }
              // 请求失败
            ).catch((error) => {
              console.log(error);
            })
        } else {
          console.log(this.form);
        }
      });
      // ******
    },

    // 验证码
    // 生成0~9的随机数 并且将其放入 nums数组中
    setRandomNum() {
      this.nums = [];
      for (let i = 0; i < 4; i++) {
        this.nums.push(this.getRandom(0, 9));
      }
      // 设置 每个验证码数字的 随机样式
      this.style = [
        {
          fontSize: this.getRandom(12, 20) + "px",
          color:
            "rgb(" +
            this.getRandom(0, 200) +
            "," +
            this.getRandom(0, 200) +
            "," +
            this.getRandom(0, 200) +
            ")",
          transform: " rotate(" + this.getRandom(-20, 20) + "deg)",
        },
        {
          fontSize: this.getRandom(12, 20) + "px",
          color:
            "rgb(" +
            this.getRandom(0, 200) +
            "," +
            this.getRandom(0, 200) +
            "," +
            this.getRandom(0, 200) +
            ")",
          transform: " rotate(" + this.getRandom(-20, 20) + "deg)",
        },
        {
          fontSize: this.getRandom(12, 20) + "px",
          color:
            "rgb(" +
            this.getRandom(0, 200) +
            "," +
            this.getRandom(0, 200) +
            "," +
            this.getRandom(0, 200) +
            ")",
          transform: " rotate(" + this.getRandom(-20, 20) + "deg)",
        },
        {
          fontSize: this.getRandom(12, 20) + "px",
          color:
            "rgb(" +
            this.getRandom(0, 200) +
            "," +
            this.getRandom(0, 200) +
            "," +
            this.getRandom(0, 200) +
            ")",
          transform: " rotate(" + this.getRandom(-20, 20) + "deg)",
        },
      ];
    },
    clearFrom() {
      this.form.username = "";
      this.form.password = "";
      this.form.iptStr = "";
    },
  },
  mounted() {
    this.setRandomNum();
  },
};

</script>

<style scoped>
#login {
  position: absolute;
  width: 400px;
  height: 350px;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 卡片整体 */
.box-card {
  padding-right: 50px;
  padding-top: 50px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgb(244, 244, 244, 0.5);
}

.verCode .show {
  position: absolute;
  left: 140px;
  top: 5px;
  display: flex;
  justify-content: center;
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: #eee;
  /* 禁止选中当前元素内的内容 */
  user-select: none;
}
</style>