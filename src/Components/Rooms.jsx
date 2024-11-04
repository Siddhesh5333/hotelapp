import React, { useState } from 'react';
import { Card, Col, Row, Typography, Space, Image } from 'antd';
import './Rooms.css';
import Navbar from './Navbar.jsx';
import sweet from './images/sweet.jpg';
import standard from './images/standard.png';
import delux from './images/delux.png';

const defaultRoomDetails = {
  name: 'Room',
  type: 'Standard Room',
  description: 'A standard room with basic amenities.',
  amenities: ['Wi-Fi', 'TV'],
  capacity: 2,
  price: '₹ 500/night',
  image: standard,  // Replace with a default image URL
};

const roomDetails = {
  '001': {
    name: 'Room 001',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,  // Replace with the actual image URL for Room 001
  },
  '101': {
    name: 'Room 101',
    type: 'Sweet Room',
    description: 'Spacious room with beautiful city views.',
    amenities: ['Wi-Fi', 'TV', 'Balcony'],
    capacity: 3,
    price: '₹ 750/night',
    image: sweet,  // Replace with the actual image URL for Room 101
  },
  '102': {
    name: 'Room 102',
    type: 'Sweet Room',
    description: 'A comfortable room with essential amenities for a relaxing stay.',
    amenities: ['Wi-Fi', 'TV'],
    capacity: 2,
    price: '₹ 750/night',
    image: sweet,  // Replace with the actual image URL for Room 102
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
    <div> <Navbar/>
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
              <Image
                width={200}
                src={currentRoomDetails.image}
                alt={currentRoomDetails.name}
                className="room-details-image"
              />
              <Typography.Text className="room-details-section">Type:</Typography.Text>
              <Typography.Paragraph>{currentRoomDetails.type}</Typography.Paragraph>
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
    </div>
  );
};

export default Rooms;
