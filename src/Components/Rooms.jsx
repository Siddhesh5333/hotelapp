import React, { useState } from 'react';
import { Card, Col, Row, Typography, Space, Image, Button, Modal, DatePicker } from 'antd';
import './Rooms.css';
import Navbar from './Navbar.jsx';
import sweet from './images/sweet.jpg';
import standard from './images/standard.png';
import delux from './images/delux.png';

const { RangePicker } = DatePicker;

const defaultRoomDetails = {
  name: 'Room',
  type: 'Standard Room',
  description: 'A standard room with basic amenities.',
  amenities: ['Wi-Fi', 'TV'],
  capacity: 2,
  price: '₹ 500/night',
  image: standard,
};

const roomDetails = {
  '001': {
    name: 'Room 001',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  '101': {
    name: 'Room 101',
    type: 'Sweet Room',
    description: 'Spacious room with beautiful city views.',
    amenities: ['Wi-Fi', 'TV', 'Balcony'],
    capacity: 3,
    price: '₹ 750/night',
    image: sweet,
  },
  '102': {
    name: 'Room 102',
    type: 'Sweet Room',
    description: 'A comfortable room with essential amenities for a relaxing stay.',
    amenities: ['Wi-Fi', 'TV'],
    capacity: 2,
    price: '₹ 750/night',
    image: sweet,
  },
};

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [onHoldRooms, setOnHoldRooms] = useState([]); // New state for held rooms
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBookedRoomModalVisible, setIsBookedRoomModalVisible] = useState(false);
  const [dates, setDates] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});

  const handleRoomClick = (roomNumber) => {
    setSelectedRoom(roomNumber);
  
    if (bookedRooms.includes(roomNumber)) {
      const roomBooking = bookingDetails[roomNumber];
      setDates([roomBooking.checkIn, roomBooking.checkOut]);
    }
  };

  const handleBooking = () => {
    setIsModalVisible(true);
  };

  const handleHold = () => {
    if (selectedRoom && !onHoldRooms.includes(selectedRoom)) {
      setOnHoldRooms([...onHoldRooms, selectedRoom]); // Add room to held state
      alert(`Room ${selectedRoom} placed on hold.`);
    }
  };

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleOk = () => {
    if (selectedRoom && !bookedRooms.includes(selectedRoom) && dates.length === 2) {
      setBookedRooms([...bookedRooms, selectedRoom]);
      setBookingDetails({
        ...bookingDetails,
        [selectedRoom]: { checkIn: dates[0], checkOut: dates[1] },
      });
      setIsModalVisible(false);
      alert(`Room ${selectedRoom} booked from ${dates[0].format('YYYY-MM-DD')} to ${dates[1].format('YYYY-MM-DD')}`);
    }
  };

  const handleRelease = () => {
    if (onHoldRooms.includes(selectedRoom)) {
      setOnHoldRooms(onHoldRooms.filter(room => room !== selectedRoom)); // Remove from held state
      alert(`Room ${selectedRoom} has been released from hold.`);
    } else {
      setBookedRooms(bookedRooms.filter(room => room !== selectedRoom));
      const updatedBookingDetails = { ...bookingDetails };
      delete updatedBookingDetails[selectedRoom];
      setBookingDetails(updatedBookingDetails);
      alert(`Room ${selectedRoom} has been released.`);
    }
    
    // Clear selected dates and reset room selection
    setDates([]);
    setSelectedRoom(null);
    
    // Close the booked room modal
    setIsBookedRoomModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsBookedRoomModalVisible(false);
  };

  const currentRoomDetails = roomDetails[selectedRoom] || {
    ...defaultRoomDetails,
    name: `Room ${selectedRoom}`,
  };

  return (
    <div>
      <Navbar/>
      <div className="room-container">
        <Card title="Rooms" className="room-card">
          <Row gutter={[18, 18]}>
            {['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'].map((floor, index) => (
              <Col span={24} key={index}>
                <Typography.Title level={4} className="floor-title">{floor}</Typography.Title>
                <Row gutter={16}>
                  {[...Array(8)].map((_, i) => {
                    const roomNumber = `${index}${String(i + 1).padStart(2, '0')}`;
                    const isBooked = bookedRooms.includes(roomNumber);
                    const isOnHold = onHoldRooms.includes(roomNumber); // Check if room is on hold

                    return (
                      <Col key={roomNumber} span={6}>
                        <Card.Grid
                          className={`room-grid ${isBooked ? 'room-grid-booked' : ''} ${isOnHold ? 'room-grid-on-hold' : ''} ${selectedRoom === roomNumber ? 'room-grid-selected' : ''}`}
                          onClick={() => handleRoomClick(roomNumber)}
                          style={{ backgroundColor: isBooked ? 'red' : isOnHold ? 'yellow' : 'white' }} // Change background color if on hold
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
              <Row gutter={16}>
                <Col span={12}>
                  <Typography.Text className="room-details-section">Type:</Typography.Text>
                  <Typography.Paragraph>{currentRoomDetails.type}</Typography.Paragraph>
                </Col>
                <Col span={12}>
                  <Typography.Text className="room-details-section">Price:</Typography.Text>
                  <Typography.Paragraph>{currentRoomDetails.price}</Typography.Paragraph>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Typography.Text className="room-details-section">Capacity:</Typography.Text>
                  <Typography.Paragraph>{currentRoomDetails.capacity} person(s)</Typography.Paragraph>
                </Col>
                <Col span={12}>
                  <Typography.Text className="room-details-section">Amenities:</Typography.Text>
                  <Typography.Paragraph>
                    {currentRoomDetails.amenities.join(', ')}
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Typography.Text className="room-details-section">Description:</Typography.Text>
              <Typography.Paragraph>{currentRoomDetails.description}</Typography.Paragraph>

              {/* Show booking details if booked */}
              {bookedRooms.includes(selectedRoom) && (
                <Space direction="vertical">
                  <Typography.Text className="room-details-section" type="success">This room is booked.</Typography.Text>
                  <Typography.Paragraph>
                    <strong>Check-In:</strong> {bookingDetails[selectedRoom].checkIn.format('YYYY-MM-DD')}
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    <strong>Check-Out:</strong> {bookingDetails[selectedRoom].checkOut.format('YYYY-MM-DD')}
                  </Typography.Paragraph>
                  <Space>
                    <Button type="primary" onClick={handleRelease}>Release</Button>
                  </Space>
                </Space>
              )}

              {/* Show hold status */}
              {onHoldRooms.includes(selectedRoom) && (
                <Space direction="vertical">
                  <Typography.Text className="room-details-section" type="warning">This room is on hold.</Typography.Text>
                  <Space>
                    <Button type="primary" onClick={handleRelease}>Release</Button>
                  </Space>
                </Space>
              )}

              {/* Booking and Hold buttons if not booked */}
              {!bookedRooms.includes(selectedRoom) && !onHoldRooms.includes(selectedRoom) && (
                <Space>
                  <Button type="primary" onClick={handleHold}>Hold</Button>
                  <Button type="primary" onClick={handleBooking}>Book</Button>
                </Space>
              )}
            </Space>
          ) : (
            <Typography.Paragraph>Select a room to view its details.</Typography.Paragraph>
          )}
        </Card>

        {/* Modal for Check-In and Check-Out */}
        <Modal title="Select Check-In and Check-Out Dates" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <RangePicker onChange={handleDateChange} />
        </Modal>

        {/* Modal for Booked Room Details */}
        <Modal
          title={`Room ${selectedRoom} Booking Details`}
          visible={isBookedRoomModalVisible}
          onOk={handleRelease}
          onCancel={handleCancel}
          okText="Release"
          cancelText="Close"
        >
          {dates.length === 2 && (
            <div>
              <Typography.Paragraph><strong>Check-In:</strong> {dates[0].format('YYYY-MM-DD')}</Typography.Paragraph>
              <Typography.Paragraph><strong>Check-Out:</strong> {dates[1].format('YYYY-MM-DD')}</Typography.Paragraph>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Rooms;
