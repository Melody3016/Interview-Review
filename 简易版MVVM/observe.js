// class Observe {
//   constructor(data) {
//     this.data = data;
//     this.init(this.data);
//   }

//   init(data) {
//     // 简单类型不再劫持
//     if (typeof data !== 'object' || typeof data === null) return;
//     Object.keys(data).forEach(key => {
//       this.defineReactive(data, key, data[key]);
//     });
//   }

//   /**
//    * 数据劫持添加响应式
//    * @param {*} data
//    * @param {*} key
//    * @param {*} value
//    */
//   defineReactive(data, key, value) {
//     const dep = new Dep()
//     // 如果val是对象，把val内部的属性转换成响应式数据
//     this.init(value)
//     Object.defineProperty(data, key, {
//       // 可遍历
//       enumerable: true,
//       // 可再配置
//       configurable: true,
//       get() {
//         // 收集依赖
//         console.log(`${key}属性被访问了，收集依赖`);
//         Dep.target && dep.addSub(Dep.target)
//         return value;
//       },
//       set(newVal) {
//         // 派发更新
//         console.log(`${key}属性更新了，派发更新`);
//         value = newVal;
//         dep.notify()
//       }
//     });
//   }
// }

class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    // 1. 判断data是否是对象
    if (!data || typeof data !== 'object') {
      return;
    }
    // 2. 遍历data对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(obj, key, val) {
    let that = this;
    // 负责收集依赖，并发送通知
    let dep = new Dep();
    // 如果val是对象，把val内部的属性转换成响应式数据
    this.walk(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newValue) {
        if (newValue === val) {
          return;
        }
        val = newValue;
        that.walk(newValue);
        // 发送通知
        dep.notify();
      }
    });
  }
}
