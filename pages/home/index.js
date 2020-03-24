import { Collapse, Carousel, Timeline } from 'antd';
import './index.less';
const { Panel } = Collapse;
import { ClockCircleOutlined } from '@ant-design/icons';

function Home() {
  return (
    <Collapse accordion defaultActiveKey={['1']}>
      <Panel header="This is panel header 1" key="1">
        <Carousel effect="fade" style={{ width: 500 }}>
          <div>
            <img src="img1.jpg" alt="" />
          </div>
          <div>
            <img src="img2.jpeg" alt="" />
          </div>
          <div>
            <img src="img3.jpg" alt="" />
          </div>
          <div>
            <img src="img4.jpg" alt="" />
          </div>
        </Carousel>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <Timeline mode="alternate">
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="green">
            Solve initial network problems 2015-09-01
          </Timeline.Item>
          <Timeline.Item
            dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremquelaudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architectobeatae vitae dicta
            sunt explicabo.
          </Timeline.Item>
          <Timeline.Item color="red">
            Network problems being solved 2015-09-01
          </Timeline.Item>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item
            dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
          >
            Technical testing 2015-09-01
          </Timeline.Item>
        </Timeline>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{3}</p>
      </Panel>
    </Collapse>
  );
}
// const Home = () => <div className="container">home</div>;

export default Home;
