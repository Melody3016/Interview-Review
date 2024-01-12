import React from 'react';

class Example2 extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  clickHandler = () => {
    // react事件中 setState异步执行
    console.log('--- start ---');

    Promise.resolve().then(() => console.log('promise then') /* callback */);

    // “异步”
    this.setState(
      { val: this.state.val + 1 },
      () => {
        console.log('state callback...', this.state);
      } // callback
    );

    console.log('--- end ---');

    // 结果:
    // start
    // end
    // state callback {val:1}
    // promise then

    // 疑问？
    // promise then微任务先注册的，按理应该先打印promise then再到state callback
    // 因为：setState本质是同步的，不过让react做成异步更新的样子而已
    // 因为要考虑性能，多次state修改，只进行一次DOM渲染
  };

  componentDidMount() {
    setTimeout(() => {
      // setTimeout中setState是同步更新
      console.log('--- start ---');

      Promise.resolve().then(() => console.log('promise then'));

      this.setState({ val: this.state.val + 1 });
      console.log('state...', this.state);

      console.log('--- end ---');
    });

    // 结果:
    // start
    // state {val:1}
    // end
    // promise then
  }

  render() {
    return (
      <p id='p1' onClick={this.clickHandler}>
        setState demo: {this.state.val}
      </p>
    );
  }
}

export default Example2;
