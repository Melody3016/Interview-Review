<template>
  <el-card class='box-card'>
    <div slot='header' class='clearfix'>
      <el-button style='float: right' icon='el-icon-setting'  @click='dialogVisible = true'>列表设置</el-button>
      <el-dialog
        width='12%'
        :visible.sync='dialogVisible'>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-divider></el-divider>
        <el-checkbox-group v-model="checkedHeaderRows" @change="handleCheckedChange">
          <div class="checkboxContainer" v-for="headerRow in headerRowData" :key="headerRow.prop" draggable="true">
            <el-checkbox :label="headerRow.prop" :disabled="headerRow.disabled">{{headerRow.label}}</el-checkbox>
            <i class="el-icon-rank dragIcon"></i>
          </div>
        </el-checkbox-group>
      </el-dialog>
    </div>
    <el-table
      :data='tableData'
      header-row-class-name='headerRow'
      style='width: 100%'>
      <el-table-column
        v-for='(item, index) in headerRows'
        :key='item.prop'
        :fixed='index === 0'
        :prop='item.prop'
        :label='item.label'
        :width='item.width'>
      </el-table-column>
      <el-table-column
        fixed='right'
        label='操作'
        width='100'>
        <template slot-scope='scope'>
          <el-button @click='handleClick(scope.row)' type='text' size='small'>查看</el-button>
          <el-button type='text' size='small'>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 表格数据
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        gender: '男',
        phone: '15357683721',
        email: '223535346@qq.com',
        number: 1,
        joinTime: '2022-02-03',
        status: '已激活',
        owner: '赵晓六',
        department: '技术部'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        gender: '男',
        phone: '15357683721',
        email: '223535346@qq.com',
        number: 2,
        joinTime: '2022-02-03',
        status: '已激活',
        owner: '赵晓六',
        department: '技术部'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        gender: '男',
        phone: '15357683721',
        email: '223535346@qq.com',
        number: 3,
        joinTime: '2022-02-03',
        status: '已激活',
        owner: '赵晓六',
        department: '技术部'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        gender: '男',
        phone: '15357683721',
        email: '223535346@qq.com',
        number: 4,
        joinTime: '2022-02-03',
        status: '已激活',
        owner: '赵晓六',
        department: '技术部'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        gender: '男',
        phone: '15357683721',
        email: '223535346@qq.com',
        number: 5,
        joinTime: '2022-02-03',
        status: '已激活',
        owner: '赵晓六',
        department: '技术部'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        gender: '男',
        phone: '15357683721',
        email: '223535346@qq.com',
        number: 6,
        joinTime: '2022-02-03',
        status: '已激活',
        owner: '赵晓六',
        department: '技术部'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        gender: '男',
        phone: '15357683721',
        email: '223535346@qq.com',
        number: 7,
        joinTime: '2022-02-03',
        status: '已激活',
        owner: '赵晓六',
        department: '技术部'
      }],
      // 表头数据
      headerRowData: [
        { prop: 'date', label: '日期', width: '150', disabled: true },
        { prop: 'name', label: '姓名', width: '120', disabled: true },
        { prop: 'province', label: '省份', width: '120' },
        { prop: 'city', label: '市区', width: '120' },
        { prop: 'address', label: '地址', width: '300' },
        { prop: 'zip', label: '邮编', width: '120' },
        { prop: 'gender', label: '性别', width: '70' },
        { prop: 'phone', label: '联系电话', width: '120' },
        { prop: 'email', label: '邮箱', width: '180' },
        { prop: 'number', label: '编号', width: '70' },
        { prop: 'joinTime', label: '入职时间', width: '140' },
        { prop: 'status', label: '激活状态', width: '120' },
        { prop: 'owner', label: '归属人', width: '120' },
        { prop: 'department', label: '部门', width: '120' }
      ],
      // 弹出框状态
      dialogVisible: false,
      // 多选框数据
      checkAll: false,
      checkedHeaderRows: ['date', 'name', 'province', 'city', 'address', 'zip', 'gender', 'phone', 'email', 'number', 'joinTime'],
      isIndeterminate: true,
      headerRowOptions: []
    }
  },

  methods: {
    handleClick(row) {
      console.log(row)
    },
    handleCheckAllChange(val) {
      this.checkedHeaderRows = val ? this.headerRowOptions : ['date', 'name']
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.headerRowData.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.headerRowData.length
    }
  },
  computed: {
    headerRows() {
      return this.headerRowData.filter(item => this.checkedHeaderRows.find(ele => ele === item.prop))
    }
  },
  mounted() {
    this.headerRowOptions = this.headerRowData.map(item => item.prop)
  }
}
</script>

<style scoped lang='scss'>
.dragIcon {
  cursor: pointer;
}
.box-card::v-deep {
  .headerRow {
    th {
      background: #eee;
    }
  }
}
.el-dialog__wrapper::v-deep {
  text-align: left;
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    > label {
      padding: 0 5px;
    }
    .el-divider--horizontal {
      margin: 12px 0;
    }
    .checkboxContainer {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      margin: 12px 0;
      padding: 0 5px;
    }
  }
}
</style>
