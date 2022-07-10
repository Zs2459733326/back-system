<template>
  <div class="infoList">
    <!-- 新增 和 查询  -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addInfo">新增</el-button>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="formInline.IdCard" placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格部分 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="date" label="出生日期" align="center"></el-table-column>
      <el-table-column prop="IdCard" label="身份证号" align="center"></el-table-column>
      <el-table-column prop="father" label="父亲" align="center"></el-table-column>
      <el-table-column prop="mother" label="母亲" align="center"></el-table-column>
      <el-table-column prop="path" label="家庭住址" align="center"></el-table-column>
      <el-table-column prop="time" label="入校时间" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateInfo(scope.row)">
          </el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
        </template>

      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <Paging :total="total" url="infoss"></Paging>
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
        <el-form-item label="出生日期" :label-width="formLabelWidth" prop="date">
          <el-input v-model.number="form.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth" prop="IdCard">
          <el-input v-model.number="form.IdCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父亲" :label-width="formLabelWidth" prop="father">
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="母亲" :label-width="formLabelWidth" prop="mother">
          <el-input v-model="form.mother" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入校时间" :label-width="formLabelWidth" prop="time">
          <el-input v-model="form.time" autocomplete="off"></el-input>
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
import Paging from '@/components/common/Paging.vue'
import { getData, changeInfo, remove } from '@/api/api'
export default {
  name: "InfoList",
  components: {
    Paging
  },
  data() {
    return {
      // 编辑时的状态 true 为添加模式，false 为编辑模式
      editState: true,
      // 获取到的总数据条数
      total: 1,
      currentPage: 1,
      pageSize: 5,
      // 弹出框表单数据
      form: {
        name: '',
        sex: '1',
        age: '',
        IdCard: '',
        father: '',
        mother: '',
        address: '',
        time: '',
        phone: ''
      },
      // 弹出框表单验证规则
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true }],
        age: [{ required: true, message: "请输入年龄" }, { type: 'number', message: '年龄必须是数值' }],
        IdCard: [{ required: true, message: "请输入身份证号" }],
        father: [{ required: true, message: "请输入姓名" }],
        mother: [{ required: true, message: "请输入姓名" }],
        address: [{ required: true, message: "请输入地址" }],
        time: [{ required: true, message: "请输入入校时间" }],
        phone: [{ required: true, message: "请输入联系方式" }],
      },
      // 弹出框的显示与隐藏
      dialogFormVisible: false,

      formLabelWidth: '120px',
      // 列表总数据
      tableData: [],
      // 查询携带参数
      formInline: {
        name: '',
        IdCard: ''
      }
    }
  },
  created() {
    let curr = (this.currentPage - 1) * this.pageSize
    getData(this, '/infoss', { offset: curr, limit: this.pageSize })
  },
  methods: {
    // 添加
    addInfo() {
      this.editState = true
      this.dialogFormVisible = true
    },
    // 编辑
    // 这里 的 row 接收的是当前 这一行的 表单数据
    updateInfo(row) {
      this.dialogFormVisible = true
      this.editState = false
      this.form = row
    },
    // 确定提交
    sure(form) {
      // 这里接收的 form 为一个对象，里面是表单的数据
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 通过判断 editState的状态，值为true是新增信息，值为false是修改信息
          if (this.editState) {
            // 调用新增信息的接口
            changeInfo(this, 'post', '/infoss', '新增数据成功', getData)
          } else {
            // 调用修改的接口
            changeInfo(this, 'patch', '/infoss', '修改数据成功', getData)
          }

        } else {
          console.error(this.form);
        }
      })
    },
    // 删除
    del(row) {
      remove(this, 'infoss', row, getData)
    },
    // 查询
    find() {
      getData(this, '/infoss', this.formInline)
    },
    // 重置
    reset() {
      getData(this, '/infoss', { offset: this.currentPage - 1, limit: this.pageSize })
      // getData(this, '/works', {})
      this.formInline = {}
    },
  }
}
</script>

<style>
</style>