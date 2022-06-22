<template>
  <div class="studentList">
    <!-- 新增 和 查询  -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addStudent">新增</el-button>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formInline.number" placeholder="学号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
    </el-form>



    <!-- 表格部分 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="number" label="学号" align="center"></el-table-column>
      <el-table-column prop="class" label="班级" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateInfo(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
        </template>

      </el-table-column>
    </el-table>



    <!-- 新增消息弹框 -->
    <el-dialog :title="editState ? '新增学生信息' : '编辑学生信息'" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="名字" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model.number="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth" prop="number">
          <el-input v-model.number="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth" prop="class">
          <el-select v-model="form.class" placeholder="选择班级">
            <el-option label="一" value="1"></el-option>
            <el-option label="二" value="2"></el-option>
            <el-option label="三" value="3"></el-option>
            <el-option label="四" value="4"></el-option>
            <el-option label="五" value="5"></el-option>
            <el-option label="六" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
          <el-select v-model="form.state" placeholder="">
            <el-option label="已入学" value="1"></el-option>
            <el-option label="未入学" value="2"></el-option>
            <el-option label="休学中" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure('form')">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>

export default {
  name: 'StudentLsut',
  data() {
    return {
      // 编辑时的状态 true 为添加模式，false 为编辑模式
      editState: true,
      form: {
        name: '',
        sex: '',
        age: '',
        number: '',
        class: '',
        state: '',
        address: '',
        phone: ''
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true }],
        age: [{ required: true, message: "请输入年龄" }, { type: 'number', message: '年龄必须是数值' }],
        number: [{ required: true, message: "请输入学号" }, { type: 'number', message: '学号必须是数值' }],
        class: [{ required: true, message: "请输入班级" }],
        state: [{ required: true, message: "请输入状态" }],
        address: [{ required: true, message: "请输入地址" }],
        phone: [{ required: true, message: "请输入联系方式" }],
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: [],
      formInline: {
        name: '',
        number: ''
      }
    }
  },
  methods: {
    // 封装请求数据的函数
    getData(){
      this.axiosPro.get('/students')
      .then(res => {
        console.log(res)
        this.tableData = [...res.data];
      })
      .catch(err => {
        console.log(err);
      })
    },
    // 查询
    find() {

    },
    // 新增
    addStudent() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    // 编辑
    // 这里 的 row 接收的是当前 这一行的 表单数据
    updateInfo(row) {
      this.dialogFormVisible = true
      this.edisState = false
      this.form = row
    },
    // 删除
    del(row) {
      console.log(row);
    },
    // 确定提交
    sure(form) {
      // console.log(this);
      // 这里接收的 form 为一个对象，里面是表单的数据
      // console.log(this.form);
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 通过判断 editState的状态，选择是新增信息，还是修改信息
          if (this.edisState) {
            // 调用新增信息的接口
            this.tableData.push(this.form)
            this.dialogFormVisible = false
            this.form = {}
          } else {
            // 调用修改的接口

          }

        } else {
          console.error(this.form);
        }
      })
    }
  }
}
</script>

<style lang="scss" >
</style>