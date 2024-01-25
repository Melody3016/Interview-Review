class Vue {
  // 构造器参数为一个配置对象
  constructor(options) {
    this.$el = document.querySelector(options.el);
    this.$data = options.data || {};

    // 对data进行代理
    // this.$data.msg ==> this.msg
    this._proxyData(this.$data);
    // 对methods进行代理
    this._proxyMethods(options.methods);

    // 对data进行数据劫持
    new Observer(this.$data)
    // 模板编译
    new Compiler(this)
  }

  /**
   * 对data进行代理
   * @param {*} data
   */
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      // 进行数据劫持
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(val) {
          data[key] = val;
        }
      });
    });
  }

  /**
   * 对methods进行代理
   * @param {*} methods
   */
  _proxyMethods(methods) {
    if (methods && typeof methods === 'object') {
      Object.keys(methods).forEach(key => {
        this[key] = methods[key];
      });
    }
  }
}
window.Vue = Vue;
