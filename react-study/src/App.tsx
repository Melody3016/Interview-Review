import './App.css';
import useStateDemo from './hooks/useStateDemo';
import useEffectDemo from './hooks/useEffectDemo';
import Example from './components/Example';
import Example2 from './components/Example2';

function App() {
  const { value, clickHandler } = useStateDemo();
  const { value: effectValue, clickHandler: effectClickHandler } = useEffectDemo();

  return (
    <div className='App'>
      <button onClick={clickHandler}>点击 {value}</button>
      <div>
        value: {effectValue} <button onClick={effectClickHandler}>点击</button>
      </div>
      <Example />
      <Example2 />
    </div>
  );
}

export default App;
