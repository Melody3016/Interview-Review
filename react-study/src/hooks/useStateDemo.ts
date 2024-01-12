// react hooks中打印
import { useState } from 'react';

function useStateDemo() {
  const [value, setValue] = useState(100);

  function clickHandler() {
    // 1.传入常量，state会合并
    setValue(value + 1);
    setValue(value + 1);
    console.log(1, value); // 100
    // 2.传入函数，state不会合并
    setValue(value => value + 1);
    setValue(value => value + 1);
    console.log(2, value); // 100

    // 3.setTimeout中，React18也开始合并state（之前版本会同步更新、不合并）
    setTimeout(() => {
      setValue(value + 1);
      setValue(value + 1);
      console.log(3, value); // 100
      setValue(value + 1);
    });

    // 4.同理 setTimeout中，传入函数不合并
    setTimeout(() => {
      setValue(value => value + 1);
      setValue(value => value + 1);
      console.log(4, value); // 100
    });
  }
  return {
    value,
    clickHandler
  };
}

export default useStateDemo;
