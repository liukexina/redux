import React, { useEffect, useState, Fragment, useReducer } from 'react';
import {
  message,
  Card,
  Avatar,
  Statistic,
  Row,
  Col,
  Input,
  Button,
  Divider,
} from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import request from '@utils/request';

const sleep = () => new Promise(res => setTimeout(res, 2000));
const { Meta } = Card;
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function onFinish() {
  console.log('finished!');
}

const useHackerNewsApi = (initialUrl, initiaData) => {
  const [data, setData] = useState(initiaData);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(initialUrl);

  //ps  加入【】 和不加的区别：加入【】只执行一次 不加一直执行
  //ps  使用表单提交时 浏览器提交表单是的本机行为，浏览器也会重新加载，为了防止此默认行为，可以加入e.prevetDefault()
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    if (!JSON.parse(localStorage.getItem('user'))) {
      message.success('用户未登录！');
      setTimeout(() => {
        window.location.href = '/login';
      });
    }
    const fetchData = async () => {
      try {
        await sleep();
        const res = await request({
          url: url,
          method: 'get',
        });
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        setIsError(true);
        console.log('error');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return [{ data, isLoading, isError }, setUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initiaData) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initiaData,
  });

  useEffect(() => {
    let didCancel = false;
    if (!JSON.parse(localStorage.getItem('user'))) {
      message.success('用户未登录！');
      setTimeout(() => {
        window.location.href = '/login';
      });
    }
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        await sleep();
        const res = await request({
          url: url,
          method: 'get',
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
        console.log(res.data);
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
        console.log('error');
      }
    };
    fetchData();
    //清理功能  消除副作用 例如取消订阅
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}

function Index() {
  const [query, setQuery] = useState('redux');
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  const [{ count, step }, dispatch] = useReducer(reducer, {
    count: 0,
    step: 1,
  });
  // const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi('./json/index.json?query=0', {});
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    './json/index.json?query=0',
    {}
  );

  //直接写async 在usEffect上会报错 hook1
  // useEffect(async () => {
  //   const res = await request({
  //     url: 'http://rap2api.taobao.org/app/mock/234047/login',
  //     method: 'post',
  //     data: {
  //       username: 'ken',
  //       password: '123456',
  //     },
  //   });
  //   resData(res);
  // });

  useEffect(() => {
    const id = setInterval(() => {
      // setCount(c => c + step);
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <Fragment>
      <Card
        style={{ width: 300, float: 'left' }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="Admin"
          description="this is a description"
        />
      </Card>
      <div style={{ float: 'left', marginLeft: '100px' }}>
        <Row gutter={8}>
          <Col span={8}>
            <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
          </Col>
          <Col span={8}>
            <Countdown
              title="Million Seconds"
              value={deadline}
              format="HH:mm:ss:SSS"
            />
          </Col>
          <Col span={12} style={{ marginTop: 32 }}>
            <Countdown
              title="Day Level"
              value={deadline}
              format="D 天 H 时 m 分 s 秒"
            />
          </Col>
        </Row>
      </div>
      <Divider />
      <Input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      ></Input>
      <Button
        type="primary"
        onClick={() => {
          // setSearch(query);
          // setUrl(`./json/index.json?query=${query}`);
          //自定义
          doFetch(`./json/index.json?query=${query}`);
        }}
      >
        Search
      </Button>
      {isError && <div> 出问题了... </div>}
      {isLoading ? (
        <div>正在加载。。。。。</div>
      ) : (
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={data.length}
            description={data.length}
          />
        </Card>
      )}
      <Button>{count}</Button>
      <input
        value={step}
        onChange={e => dispatch({ type: 'step', step: Number(e.target.value) })}
      />
    </Fragment>
  );
}

export default Index;
