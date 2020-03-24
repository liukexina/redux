import React, { Fragment, useState } from 'react';
import { Button, Input } from 'antd';
import { useToggle, useDebounce } from '@umijs/hooks';

function UmiHook() {
  const { state, toggle } = useToggle();
  const [value, setValue] = useState(0);
  const debouncedValue = useDebounce(value, 500);

  return (
    <Fragment>
      <div>
        <p>Current Boolean: {String(state)}</p>
        <p>
          <Button onClick={() => toggle()}>Toggle</Button>
        </p>
      </div>
      <div>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Typed value"
          style={{ width: 280 }}
        />
        <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
      </div>
    </Fragment>
  );
}

export default UmiHook;
