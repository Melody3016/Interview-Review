function _runTask(task, callback) {
  // requestIdleCallback(deadline => {
  //   if (deadline.timeRemaining() > 0) {
  //     task()
  //     callback()
  //   } else {
  //     _runTask(task, callback)
  //   }
  // });
  const startTime = Date.now()
  requestAnimationFrame(() => {
    if (Date.now() - startTime < 16.6) {
      task()
      callback()
    } else {
      _runTask(task, callback)
    }
  })
}

/**
 * 运行一个耗时任务
 * 如果要异步执行任务，请返回Promise
 * 要尽快完成任务，同时不要让页面产生卡顿
 * 尽量兼容更多的浏览器
 * @param {Function} task
 */
function runTask(task) {
  /**
   * 思路：
   *  1. 使用 window.requestAnimationFrame方法
   *  window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
   */
  return new Promise(resolve => {
    // requestAnimationFrame(task)
    // task()
    // resolve()
    setTimeout(() => {
      task();
      resolve();
    }, 0);
  });
  task();
}
