class Dep {
  constructor() {
    // 存放所有watcher，使用属性uid区分
    this.subs = {}
  }
  // 收集依赖
  addSub(target) {
    this.subs[target.uid] = target
  }
  // 派发更新
  notify() {
    for (const uid in this.subs) {
      // 调用watcher的update方法
      console.log(`${uid}触发update`);
      this.subs[uid].update();
    }
  }
}