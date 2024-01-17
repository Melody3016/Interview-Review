import { useEffect, useState } from 'react';
import './App.css';
import useStateDemo from './hooks/useStateDemo';
import useEffectDemo from './hooks/useEffectDemo';
import Example from './components/Example';
import Example2 from './components/Example2';
import MemoDemo from './components/MemoDemo';

function App() {
  // const { value, clickHandler } = useStateDemo();
  // const { value: effectValue, clickHandler: effectClickHandler } = useEffectDemo();
  const [count, setCount] = useState(0);
  const increment = () => {
    setTimeout(() => {
      setCount(count + 1)
    }, 0)
  }
  // console.log('1', count);

  // useEffect(() => {
  //   setCount(count => count + 1);
  // }, []);

  // useEffect(() => {
  //   console.log('2', count);
  //   setTimeout(() => {
  //     console.log('3', count);
  //   }, 100);
  // }, []);
  console.log(count);
  
  return (
    <div className='App'>
      <button onClick={increment}>click me</button>
      {/* <button onClick={clickHandler}>点击 {value}</button>
      <div>
        value: {effectValue} <button onClick={effectClickHandler}>点击</button>
      </div>
      <Example />
      <Example2 /> */}
      {/* <MemoDemo /> */}
    </div>
  );
}

export default App;
