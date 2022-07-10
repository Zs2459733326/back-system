// 请求列表信息封装
export function getData(root, url, params) {
  // 请求总数据条数
  root.axiosPro.get(url + '/count')
    .then(res => { 
      //      ****+ '?limit=' + root.total
      res.status === 200 ? root.total = res.data : root.total = 0
      console.log(root.total);
      // 拿到数据的总条数后，发送请求拿到全部数据 
      root.axiosPro.get(url, { params: params })
        .then(res => {
          //   console.log(res.status)
          if (res.status == 200) {
            root.tableData = [...res.data];
          } else {
            root.$message.error(res.data.message)
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch((err => {
      console.error(err);
    }))
}
// 更改列表信息封装（添加、修改）
export function changeInfo(root, method, url, mess, callback) {
  if (method === 'post') {
    // 调用新增信息的接口
    root.axiosPro[method](url, root.form)
      .then((res) => {
        console.log(res);
        callback(root, url)
        root.dialogFormVisible = false
        root.$message({
          type: 'success',
          message: mess
        });
        // root.$refs[form].resetField()
      })
      .catch(() => {
        root.$message({
          type: 'error',
          message: '出错'
        });
      })
  } else if (method === 'patch') {
    // 调用修改的接口
    // 拿到当前行的 表单数据
    // console.log(root.form);
    root.axiosPro[method](url + '/' + root.form.id, root.form)
      .then(() => {
        callback(root, url, {})
        root.dialogFormVisible = false
        root.$message({
          type: 'success',
          message: mess
        });
      })
      .catch(() => {
        root.$message({
          type: 'error',
          message: '出错'
        });
      })
  }
}
// 删除列表信息封装
export function remove(root, url, row, callback) {
  // console.log(row);
  root.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 请求删除接口
    root.axiosPro.delete(url + '/' + row.id)
      .then(() => {
        callback(root, 'infoss')
        root.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
  }).catch((err) => {
    root.$message({
      type: 'info',
      message: err
    });
  })
}

