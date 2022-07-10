<template>
  <div class="studentList">
    <!-- 新增 和 查询  -->
    <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
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
        <el-button type="primary" @click="find()">查询</el-button>
        <el-button type="primary" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>



    <!-- 表格部分 -->
    <!-- tableData.slice((当前页数 -1)*每页条数，当前页数*当前页条数)  -->
    <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
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
    <!-- 通过 editState 的布尔值 来判断 弹出框的状态 从而判断应该执行 新增（true） 还是 修改(false) 操作-->
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

    <!-- 分页器 -->
    <el-pagination
      background
      @size-change="hanldSizeChange"
      @current-change="hanldCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
</el-pagination>

  </div>
</template>

<script>

export default {
  name: 'StudentLsut',
  data() {
    return {
      // 编辑时的状态 true 为添加模式，false 为编辑模式
      editState: true,
      // 当前行的表单数据   新增和编辑的表单数据
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
      // 新增和编辑的表单的规则
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
      // 弹出框 默认关闭
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 表格数据
      tableData: [],
      // 查询功能 的表单数据
      formInline: {
        name: '',
        number: ''
      },
      // 分页数据
      total:50, // 总条数
      currentPage: 1, // 当前页数
      pageSize: 10 // 每页显示条数 

    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 分页函数
    hanldSizeChange(val){
      // console.log(val);
      this.pageSize = val
      this.currentPage = 1
    },
    hanldCurrentChange(val){
      // console.log(val);
      this.currentPage = val 
    },
    // 封装请求数据的函数
    getData() {
    // 请求总数据条数
    this.axiosPro.get('/students/count')
    .then(res => {
      res.status === 200 ? this.total = res.data : this.total = 0
      console.log(this.total);
      // 拿到数据的总条数后，发送请求拿到全部数据 
        this.axiosPro.get('/student?limit=' + this.total)
        .then(res => {

          if (res.status == 200) {
            // console.log(res.data);
            res.data.forEach(item => {
              item.sex === "1" ? item.sex_text = "男" : item.sex_text = "女"
              if (item.state === "1") {
                item.state_text = "已入学"
              } else if (item.state === "2") {
                item.state_text = "未入学"
              } else {
                item.state_text = "休学中"
              }
            })
            this.tableData = [...res.data];
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch((err => {
      console.error(err);
    }))
    },
    // 查询
    find() {
      this.axiosPro.get('student', {
        params: this.formInline
      })
        .then((res) => {
          this.tableData = [...res.data]
          // this.getData()
        }).catch((err) => {
          console.log(err);
        })

    },
    // 重置
    reset() {
      this.formInline = {}
      this.getData()
    },
    // 新增
    addStudent() {
      this.dialogFormVisible = true
      // 将弹出框改为 新增 状态
      this.editState = true

      // 每次新增时，将 form 表单 变成默认状态
      // #region
      this.form = {
        name: '',
        sex: '1',
        age: '',
        number: '',
        class: '',
        state: '',
        address: '',
        phone: ''
      }
      //#endregion

    },
    // 修改
    // 这里 的 row 接收的是当前 这一行的 表单数据
    updateInfo(row) {
      // 显示弹出框
      this.dialogFormVisible = true
      // 将弹出框改为 修改 状态
      this.editState = false
      // this.form = row  这种写法 为什么会出现 修改时，列表数据也会实时变化的情况（深浅拷贝 不太明白）
      // 将当前行的 表单数据 绑定form表单
      this.form = { ...row }
    },
    // 删除
    del(row) {
      // console.log(row);
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除接口
        this.axiosPro.delete('student/' + row.id)
          .then(() => {
            this.getData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    // 确定提交
    sure(form) {
      // console.log(this);
      // 这里接收的 form 为一个对象，里面是表单的数据
      // console.log(this.form);
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 通过判断 editState的状态，值为true是新增信息，值为false是修改信息
          if (this.editState) {
            // 调用新增信息的接口
            this.axiosPro.post('students', this.form)
              .then((res) => {
                console.log(res);
                this.getData()
                this.dialogFormVisible = false
                this.$message({
                  type: 'success',
                  message: '新增数据成功!'
                });
                // this.$refs[form].resetField()
              })

          } else {
            // 调用修改的接口
            // 拿到当前行的 表单数据
            // console.log(this.form);
            this.axiosPro.patch('students/' + this.form.id, this.form)
              .then(() => {
                this.getData()
                this.dialogFormVisible = false
                this.$message({
                  type: 'success',
                  message: '修改数据成功!'
                });
              })
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
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
</style>