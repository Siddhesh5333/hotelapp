import React from 'react';
import { Card } from 'antd';
import './Rooms.css';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const Rooms = () => (
  <div>
    <Card className='.ant-card-head' title="Ground Floor">
      <Card.Grid style={gridStyle}>001</Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        002
      </Card.Grid>
      <Card.Grid style={gridStyle}>003</Card.Grid>
      <Card.Grid style={gridStyle}>004</Card.Grid>
      <Card.Grid style={gridStyle}>005</Card.Grid>
      <Card.Grid style={gridStyle}>006</Card.Grid>
      <Card.Grid style={gridStyle}>007</Card.Grid>
      <Card.Grid style={gridStyle}>008</Card.Grid>
    </Card>

    {/* Second identical grid */}
    <Card title="First Floor">
      <Card.Grid style={gridStyle}>101</Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        102
      </Card.Grid>
      <Card.Grid style={gridStyle}>103</Card.Grid>
      <Card.Grid style={gridStyle}>104</Card.Grid>
      <Card.Grid style={gridStyle}>105</Card.Grid>
      <Card.Grid style={gridStyle}>106</Card.Grid>
      <Card.Grid style={gridStyle}>107</Card.Grid>
      <Card.Grid style={gridStyle}>108</Card.Grid>
    </Card>

    <Card title="Second Floor">
      <Card.Grid style={gridStyle}>201</Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        202
      </Card.Grid>
      <Card.Grid style={gridStyle}>203</Card.Grid>
      <Card.Grid style={gridStyle}>204</Card.Grid>
      <Card.Grid style={gridStyle}>205</Card.Grid>
      <Card.Grid style={gridStyle}>206</Card.Grid>
      <Card.Grid style={gridStyle}>207</Card.Grid>
      <Card.Grid style={gridStyle}>208</Card.Grid>
    </Card>

    <Card title="Third Floor">
      <Card.Grid style={gridStyle}>301</Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        302
      </Card.Grid>
      <Card.Grid style={gridStyle}>303</Card.Grid>
      <Card.Grid style={gridStyle}>304</Card.Grid>
      <Card.Grid style={gridStyle}>305</Card.Grid>
      <Card.Grid style={gridStyle}>306</Card.Grid>
      <Card.Grid style={gridStyle}>307</Card.Grid>
      <Card.Grid style={gridStyle}>308</Card.Grid>
    </Card>
  </div>
);

export default Rooms;
