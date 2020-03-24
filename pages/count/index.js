import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useInterval } from './useInterval';
import { Button } from 'antd';

function index() {
  return (
    <Fragment>
      <Counters></Counters>
      {/* <Counter eg="LLL" /> */}
    </Fragment>
  );
}
function Counter(eg) {
  const [count, setCount] = useState(0);
  const savedCallback = useRef();
  function callback() {
    console.log(eg);
    setCount(count + 1);
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <h1>{count}</h1>;
}

function Counters() {
  const [delay, setDelay] = useState(1000);
  const [count, setCount] = useState(0);

  // 增加计数器
  useInterval(() => {
    setCount(count + 1);
  }, delay);

  // 每秒加速
  useInterval(() => {
    if (delay > 10) {
      setDelay(delay / 2);
    }
  }, 1000);

  function handleReset() {
    setDelay(1000);
  }

  return (
    <>
      <h1>Counter: {count}</h1>
      <h4>Delay: {delay}</h4>
      <Button onClick={handleReset}>Reset delay</Button>
    </>
  );
}

export default index;
