import React, { useState } from 'react';
import { Card, Col, Row, Typography, Space } from 'antd';
import './Rooms.css';

const defaultRoomDetails = {
  name: 'Room',
  description: 'A standard room with basic amenities.',
  amenities: ['Wi-Fi', 'TV'],
  capacity: 2,
  price: '$100/night',
};

const roomDetails = {
  '001': {
    name: 'Room 001',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '$100/night',
  },
  '101': {
    name: 'Room 101',
    description: 'Spacious room with beautiful city views.',
    amenities: ['Wi-Fi', 'TV', 'Balcony'],
    capacity: 3,
    price: '$150/night',
  },
  // Add more specific room details as needed...
};

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomClick = (roomNumber) => {
    setSelectedRoom(roomNumber);
  };

  const currentRoomDetails = roomDetails[selectedRoom] || {
    ...defaultRoomDetails,
    name: `Room ${selectedRoom}`,
  };

  return (
    <div className="room-container">
      <Card title="Rooms" className="room-card">
        <Row gutter={[18, 18]}>
          {['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'].map((floor, index) => (
            <Col span={24} key={index}>
              <Typography.Title level={4} className="floor-title">{floor}</Typography.Title>
              <Row gutter={16}>
                {[...Array(8)].map((_, i) => {
                  const roomNumber = `${index}${String(i + 1).padStart(2, '0')}`;
                  return (
                    <Col key={roomNumber} span={6}>
                      <Card.Grid
                        className={`room-grid ${selectedRoom === roomNumber ? 'room-grid-selected' : ''}`}
                        onClick={() => handleRoomClick(roomNumber)}
                      >
                      {roomNumber}
                      </Card.Grid>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="Room Details" className="room-details-card">
        {selectedRoom ? (
          <Space direction="vertical">
            <Typography.Title level={4} className="room-details-title">{currentRoomDetails.name}</Typography.Title>
            <Typography.Text className="room-details-section">Description:</Typography.Text>
            <Typography.Paragraph>{currentRoomDetails.description}</Typography.Paragraph>
            <Typography.Text className="room-details-section">Amenities:</Typography.Text>
            <Typography.Paragraph>
              {currentRoomDetails.amenities.join(', ')}
            </Typography.Paragraph>
            <Typography.Text className="room-details-section">Capacity:</Typography.Text>
            <Typography.Paragraph>{currentRoomDetails.capacity} person(s)</Typography.Paragraph>
            <Typography.Text className="room-details-section">Price:</Typography.Text>
            <Typography.Paragraph>{currentRoomDetails.price}</Typography.Paragraph>
          </Space>
        ) : (
          <Typography.Paragraph>Select a room to view its details.</Typography.Paragraph>
        )}
      </Card>
    </div>
  );
};

export default Rooms;
