import React from 'react';

// 拓展：setState传入函数不会合并
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  componentDidMount() {
    this.setState((prevState, props) => {
      return { val: prevState.val + 1 };
    });
    console.log(this.state.val); // 0
    // 第 1 次 log
    this.setState((prevState, props) => {
      // 传入函数，不会合并覆盖前面的
      return { val: prevState.val + 1 };
    });
    console.log(this.state.val); // 0
    // 第 2 次 log
    setTimeout(() => {
      // setTimeout中setState同步执行
      // 到这里this.state.val结果等于2了
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 3
      // 第 3 次 log
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 4
      // 第 4 次 log
    }, 0);
  }
  render() {
    return null;
  }
}
// 答案：0 0 3 4

export default Example;
