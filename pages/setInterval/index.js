import React, { useState, Fragment } from 'react';
import { Input, Switch } from 'antd';
import { useInterval } from './useInterval';

function Counter() {
  let [count, setCount] = useState(0);
  let [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      // 你自己的代码
      setCount(count + 1);
    },
    isRunning ? delay : null
  );

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  function handleIsRunningChange(checked) {
    setIsRunning(checked);
  }

  return (
    <Fragment>
      <h1>{count}</h1>
      <Switch defaultChecked={isRunning} onChange={handleIsRunningChange} />
      <Input value={delay} onChange={handleDelayChange}></Input>
    </Fragment>
  );
}

export default Counter;
