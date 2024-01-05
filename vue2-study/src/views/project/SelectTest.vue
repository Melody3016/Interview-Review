<template>
  <div class="box" :class="{ active: listLength }">
    <el-select
      v-model="value"
      multiple
      clearable
      collapse-tags
      ref="select"
      style="margin-left: 20px;"
      placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        { value: '黄金糕', label: '黄金糕' },
        { value: '双皮奶', label: '双皮奶' },
        { value: '蚵仔煎', label: '蚵仔煎' },
        { value: '龙须面', label: '龙须面' },
        { value: '北京烤鸭', label: '北京烤鸭' },
        { value: '东坡肉', label: '东坡肉' },
        { value: '热干面', label: '热干面' },
        { value: '胡辣汤', label: '胡辣汤' },
        { value: '小龙虾', label: '小龙虾' },
        { value: '辣子鸡', label: '辣子鸡' }
      ],
      value: []
    }
  },
  computed: {
    listLength() {
      return this.value.length
    }
  },
  mounted() {
    // 创建按钮
    this.createBtn()
  },
  methods: {
    createBtn() {
      const selectEle = this.$refs.select
      const ele = selectEle.$children[1].$el
      const buttonEle = document.createElement('button')
      buttonEle.className = 'my-btn'
      buttonEle.textContent = '提交'
      buttonEle.addEventListener('click', this.handlerClick)
      ele.appendChild(buttonEle)
    },
    handlerClick() {
      console.log(this.value)
      this.$refs.select.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    margin: 20px auto;

    &.active ::v-deep {
       .el-icon-arrow-up::before {
        background: url('../../assets/images/active.png') no-repeat !important;
        background-size: 100% 100% !important;
      }
    }
    .el-select ::v-deep {
      .el-icon-arrow-up::before,
      .el-icon-circle-close::before {
        content: '';
        position: absolute;
        height: 14px;
        width: 14px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(180deg);
        background: url('../../assets/images/normal.png') no-repeat;
        background-size: 100% 100%;
      }
      .el-icon-circle-close::before {
        background: url('../../assets/images/clear.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>

<style lang="scss">
  .my-btn {
    border-radius: 10px;
    padding: 6px 15px;
    margin: 8px auto;
    display: block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: .1s;
    font-weight: 500;
    font-size: 14px;
  }
</style>
