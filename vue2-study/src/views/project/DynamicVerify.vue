<template>
  <div class="container">
    <el-form :model="formData" ref="ruleForm" label-width="80px" :rules="rules">
      <el-form-item label="name" prop="name">
        <el-input type="text" v-model="formData.name" />
      </el-form-item>
      <el-form-item label="file" prop="file">
        <el-input type="file" v-model="formData.file" @change="changeHandler" />
      </el-form-item>
      <el-form-item label="select" prop="selectObj.selectVal">
        <el-select v-model="formData.selectObj.selectVal" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="box"
        v-for="(item,index) in formData.inputList"
        :key="index"
      >
        <el-form-item label="key" :prop="'inputList.'+index+'.key'" :rules="rules.key">
          <el-input type="text" v-model="item.key" />
        </el-form-item>
        <el-form-item label="url"  :prop="'inputList.'+index+'.url'" :rules="rules.url">
          <el-input type="text" v-model="item.url" />
        </el-form-item>
      </div>
      <el-button @click="add">添加</el-button>
      <el-button @click="submit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      formData: {
        name: '',
        file: '',
        selectObj: {
          selectVal: ''
        },
        inputList: [
          { key: '', url: '' }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入name', trigger: 'change' }
        ],
        file: [
          { required: true, message: '请选择file', trigger: 'change' }
        ],
        key: [
          { required: true, message: '请输入Key', trigger: 'change' }
        ],
        url: [
          { required: true, message: '请输入url', trigger: 'change' }
        ],
        'selectObj.selectVal': [
          { required: true, message: '请选择select', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    changeHandler(file) {
      console.log(file, 'file')
    },
    add() {
      this.formData.inputList.push({})
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
  // mounted() {
  //   setTimeout(() => {
  //     this.formData =  {
  //       name: '',
  //       selectObj: {
  //         selectVal: ''
  //       },
  //       inputList: [
  //         { key: '', url: '' }
  //       ]
  //     }
  //   }, 1000)
  // }
}
</script>

<style>
.container {
  width: 600px;
  margin: 100px auto;
}
.box {
  display: flex;
}
</style>
