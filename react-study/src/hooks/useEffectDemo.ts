import { useEffect, useState } from 'react';

function useEffectDemo() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(value); // 3
    }, 1000);
    return () => {
      clearTimeout(timer); // value变化会导致useEffectDemo函数多次执行，多次执行需要清除上一次的定时器，否则多次注册定时器
    };
  }, [value]); // 这里增加依赖项，每次依赖变化都会重新执行

  const clickHandler = () => {
    setValue(value + 1);
  };

  return {
    value,
    clickHandler
  };
}

export default useEffectDemo;
