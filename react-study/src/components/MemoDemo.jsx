import React, { useState, memo, useMemo } from 'react';

// 子组件
// function Child({ userInfo }) {
//   console.log('Child render...', userInfo);

//   return (
//     <div>
//       <p>
//         This is Child {userInfo.name} {userInfo.age}
//       </p>
//     </div>
//   );
// }
// 类似 class PureComponent ，对 props 进行浅层比较
const Child = memo(({ userInfo }) => {
    console.log('Child render...', userInfo)

    return <div>
        <p>This is Child {userInfo.name} {userInfo.age}</p>
    </div>
})

// 父组件
function MemoDemo() {
  console.log('Parent render...');

  const [count, setCount] = useState(0);
  const [name, setName] = useState('test');

  // const userInfo = { name, age: 20 }
  // 用 useMemo 缓存数据，有依赖
  // useMemo包裹后返回的对象是同一个，没有创建新的对象地址，不会触发子组件的重新渲染
  const userInfo = useMemo(() => {
    return { name, age: 21 };
  }, [name]);

  return (
    <div>
      <p>
        count is {count}
        <button onClick={() => setCount(count + 1)}>click</button>
      </p>
      <Child userInfo={userInfo}></Child>
    </div>
  );
}

export default MemoDemo;
