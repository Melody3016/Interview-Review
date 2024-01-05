<template>
  <div style="border: 1px solid #ccc; text-align: left;">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {}
        // 其他属性...
      },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    // 进行菜单栏配置
    menuConfig() {
      // 自定义校验图片
      // function customCheckImageFn(
      //   src: string,
      //   alt: string,
      //   url: string
      // ): boolean | undefined | string {
      // TS 语法
      function customCheckImageFn(src, alt, url) {
        if (!src) {
          return
        }
        if (src.indexOf('http') !== 0) {
          return '图片网址必须以 http/https 开头'
        }
        return true

        // 返回值有三种选择：
        // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
        // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
        // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
      }

      // 转换图片链接
      // function customParseImageSrc(src: string): string {
      // TS 语法
      function customParseImageSrc(src) {
        if (src.indexOf('http') !== 0) {
          return `http://${src}`
        }
        return src
      }

      // 初始化 MENU_CONF 属性
      // const editorConfig: Partial<IEditorConfig> = {
      // TS 语法
      // this.editorConfig = {
      //   MENU_CONF: {}
      //   // 其他属性...
      // }
      // 插入图片
      // eslint-disable-next-line dot-notation
      this.editorConfig.MENU_CONF['insertImage'] = {
        // onInsertedImage(imageNode: ImageElement | null) {
        // TS 语法
        onInsertedImage(imageNode) {
          if (imageNode == null) return

          const { src, alt, url, href } = imageNode
          console.log('inserted image', src, alt, url, href)
        },
        checkImage: customCheckImageFn, // 也支持 async 函数
        parseImageSrc: customParseImageSrc // 也支持 async 函数
      }
      // 编辑图片
      // eslint-disable-next-line dot-notation
      this.editorConfig.MENU_CONF['editImage'] = {
        // onUpdatedImage(imageNode: ImageElement | null) {
        // TS 语法
        onUpdatedImage(imageNode) {
          if (imageNode == null) return

          const { src, alt, url } = imageNode
          console.log('updated image', src, alt, url)
        },
        checkImage: customCheckImageFn, // 也支持 async 函数
        parseImageSrc: customParseImageSrc // 也支持 async 函数
      }
      // 上传图片
      // eslint-disable-next-line dot-notation
      this.editorConfig.MENU_CONF['uploadImage'] = {
        server: '/my-web/upload/multiple',

        // form-data fieldName ，默认值 'wangeditor-uploaded-image'
        fieldName: 'picture',

        // 单个文件的最大体积限制，默认为 2M
        // maxFileSize: 1 * 1024 * 1024, // 1M

        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,

        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/*'],

        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
        // meta: {
        //   token: 'xxx',
        //   otherKey: 'yyy'
        // },

        // 将 meta 拼接到 url 参数中，默认 false
        // metaWithUrl: false,

        // 自定义增加 http  header
        // headers: {
        //   Accept: 'text/x-json',
        //   otherKey: 'xxx'
        // },

        // 跨域是否传递 cookie ，默认为 false
        // withCredentials: true,

        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒

        // 上传之前触发
        // onBeforeUpload(file: File) {
        // TS 语法
        onBeforeUpload(file) {
          // file 选中的文件，格式如 { key: file }
          return file

          // 可以 return
          // 1. return file 或者 new 一个 file ，接下来将上传
          // 2. return false ，不上传这个 file
        },

        // 上传进度的回调函数
        // onProgress(progress: number) {
        // TS 语法
        onProgress(progress) {
          // progress 是 0-100 的数字
          console.log('progress', progress)
        },

        // 单个文件上传成功之后
        // onSuccess(file: File, res: any) {
        // TS 语法
        onSuccess(file, res) {
          console.log(`${file.name} 上传成功`, res)
        },

        // 单个文件上传失败
        // onFailed(file: File, res: any) {
        // TS 语法
        onFailed(file, res) {
          console.log(`${file.name} 上传失败`, res)
        },

        // 上传错误，或者触发 timeout 超时
        // onError(file: File, err: any, res: any) {
        // TS 语法
        onError(file, err, res) {
          console.log(`${file.name} 上传出错`, err, res)
        },

        // 自定义插入图片
        // customInsert(res: any, insertFn: InsertFnType) {  // TS 语法
        customInsert(res, insertFn) {
          // res 即服务端的返回结果
          console.log('res', res)
          const fileInfo = res.data.fileList[0]
          // 从 res 中找到 url alt href ，然后插入图片
          insertFn(fileInfo.fileShowPath, fileInfo.fileName, fileInfo.fileShowPath)
        }
      }
    }
  },
  created() {
    this.menuConfig()
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
      console.log(this.editor.getConfig())
      // this.editor.$textElem.css('text-align', 'left')
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped></style>
