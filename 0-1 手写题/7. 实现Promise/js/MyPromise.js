class MyPromise {
  PromiseState = 'pending';
  PromiseResult = undefined;
  constructor(actuator) {
    const resolve = value => {
      if (this.PromiseState !== 'pending') return;
      this.PromiseState = 'fulfilled';
      this.PromiseResult = value;
    };
    const reject = value => {
      if (this.PromiseState !== 'pending') return;
      this.PromiseState = 'rejected';
      this.PromiseResult = value;
    };
    // 执行actuator，并传入两个改变状态的函数
    actuator(resolve, reject);
  }

  then(resolved, rejected) {
    return new MyPromise((resolve, reject) => {
      const res = resolved(this.PromiseResult)
      resolve(res)
    })
  }
}
