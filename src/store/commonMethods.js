

const commonMethods = {

    handleDelete(vm, id, urlSuffix) {
        vm.$confirm('确认删除该条记录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                vm.$axios.post(urlSuffix, [id])
                    .then(res => {
                        if (res.data.code === 200 && res.data.data === '删除成功') {
                            vm.$message({
                                message: res.data.data,
                                type: 'success',
                                center: true
                            });
                            vm.getAllData();
                        } else {
                            console.log(res.data.data);
                            vm.$message({
                                message: '删除失败',
                                type: 'error',
                                center: true
                            });
                        }
                    })
                    .catch(error => {
                        vm.$message({
                            message: error,
                            type: 'error',
                            center: true
                        });
                    });
            })
            .catch(() => {
                vm.$message({
                    type: 'warning',
                    message: '已取消删除',
                    center: true
                });
            });
    },

    getAll(vm,url) {
        vm.$axios.get(url, {}
        ).then(res => {
            if (res.data.code === 200) {
                console.log(res.data)
                vm.tableData = res.data.data
                if(vm.initChart){
                    vm.initChart();
                }
                if(vm.tableDataAside){
                    vm.tableDataAside = [];
                    console.log(vm.tableData)
                    vm.tableData.forEach(item => {
                        let combinedNameId = item.positionName + '(' + item.neighbourhoodName + ')';
                        vm.tableDataAside.push({ date: combinedNameId ,neighbourhoodId:item.neighbourhoodId,positionId:item.positionId});
                    });
                    console.log(vm.tableDataAside)
                }
            } else {
                vm.$message({
                    message: '系统出错，请联系管理员',
                    type: 'error',
                    center: true
                });
            }
        }).catch(error => {
            vm.$message({
                message: error,
                type: 'error',
                center: true
            });
        })
    },

    save(vm,url) {
        vm.isSaving = true; // 禁用确定按钮
        vm.$axios.post(url, vm.formData)
            .then(res => {
                if (res.data.code === 200&&res.data.data==='添加成功') {
                    vm.$message({
                        message: res.data.data,
                        type:'success',
                        center: true
                    });
                    vm.dialogVisible = false;
                    vm.resetForm();
                    vm.getAllData()
                }
                else if (res.data.code === 200 && res.data.data === '添加失败') {
                    vm.$message({
                        message:res.data.data,
                        type: 'error'
                    });}
                else {
                    vm.$message({
                        message: res.data.message,
                        type: 'error',
                        center: true
                    });
                }
            })
            .catch(error => {
                vm.$message({
                    message: error.message,
                    type: 'error',
                    center: true
                });
            }).finally(() => {
            vm.isSaving = false; // 启用确定按钮
        });
    },

    update(vm, url) {
        vm.isSaving = true; // 禁用确定按钮
        vm.$axios.post(url, vm.formData)
            .then(res => {
                if (res.data.code === 200 && res.data.data === '更新成功') {
                    vm.$message({
                        message: res.data.data,
                        type: 'success',
                        center: true
                    })
                }
                else if (res.data.code === 200 && res.data.data === '更新失败') {
                    vm.$message({
                        message:res.data.data,
                        type: 'error'
                    });
                }
                else {
                    vm.$message({
                        message: res.data.message,
                        type: 'error',
                        center: true
                    })
                }
                vm.dialogVisible = false;
                vm.resetForm();
                vm.getAllData();
            })
            .catch(error => {
                vm.$message({
                    message: error,
                    type: 'error',
                    center: true
                });
            }).finally(() => {
            vm.isSaving = false; // 启用确定按钮
        });
    },

    deleteSelectedIds(vm,url) {
        if (vm.selectedRows.length === 0) {
            vm.$message({
                message: '请至少选择一项',
                type: 'warning',
                center: true
            });
            return; // 防止继续执行删除操作
        }
        vm.$axios.post(url, vm.selectedRows )
            .then(res => {
                if (res.data.code === 200&&res.data.data==='删除成功') {
                    vm.$message({
                        message: res.data.data,
                        type:'success',
                        center: true
                    });
                    vm.getAllData();
                }
                else if (res.data.code === 200 && res.data.data === '删除失败') {
                    vm.$message({
                        message:res.data.data,
                        type: 'error'
                    });
                }
                else {
                    console.log(res.data.data)
                    vm.$message({
                        message: '删除失败',
                        type: 'error',
                        center: true
                    });
                }
                vm.getAllData();
            })
            .catch(error => {
                vm.$message({
                    message: error,
                    type: 'error',
                    center: true
                });
            });
    },

    getDataByParams(vm,url,params){
        vm.$axios.get(url, { params:{neighbourhoodId:params}  })
            .then(res => {
                 if (res.data.code === 200) {
                     vm.tableData=res.data.data;
                     if(vm.initChart){
                         vm.initChart();
                     }
                 }
                 else {
                     vm.$message({
                         message: '系统出错，请联系管理员',
                         type: 'error',
                         center: true
                     });
                 }
            }).catch(error => {
                console.log(error)
            vm.$message({
                message: error,
                type: 'error',
                center: true
            });
        })
    }
};

export default commonMethods;
