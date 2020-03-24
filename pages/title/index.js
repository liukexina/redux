import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  Fragment,
} from 'react';
import { Button } from 'antd';
import { myReducer } from './reduce';
import request from '@utils/request';

const AppContext = React.createContext({});

export default function Title() {
  const [buttonText, setButtonText] = useState('Click me, please');
  const [show, setShow] = useState(0);
  const handleClick = function() {
    setButtonText('Thanks, been clicked!');
    setShow(show + 1);
  };

  return (
    <AppContext.Provider value={{ username: 'superawesome' }}>
      <div className="App">
        <Navbar />
        <Person personId={show} />
        <Button onClick={handleClick}>{buttonText}</Button>
        <Button>{show}</Button>
      </div>
    </AppContext.Provider>
  );
}

function Navbar() {
  const { username } = useContext(AppContext);
  const [state, dispatch] = useReducer(myReducer, { count: 0 });
  return (
    <Fragment>
      <Button>{username}</Button>
      <div className="App">
        <Button onClick={() => dispatch({ type: 'countUp' })}>+1</Button>
        <p>Count: {state.count}</p>
      </div>
    </Fragment>
  );
}

//自定义hook
const usePerson = personId => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await request({
        url: 'http://rap2api.taobao.org/app/mock/234047/login',
        data: {
          username: 'ken',
          password: '123456',
        },
        method: 'post',
      });
      console.log(res);
      setPerson(res.data);
      setLoading(false);
    };
    fetchData();
  }, [personId]);
  return [loading, person];
};

const Person = ({ personId }) => {
  const { username } = useContext(AppContext);
  const [loading, person] = usePerson(personId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }
  return (
    <div>
      <div>{username}</div>
      <p>You're viewing: {person.user.id}</p>
    </div>
  );
};
