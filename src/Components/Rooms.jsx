import React, { useState } from 'react';
import { Card, Col, Row, Typography, Space, Image, Button, Modal, DatePicker } from 'antd';
import './Rooms.css';
import Navbar from './Navbar.jsx';
import RoomFilter from './RoomFilter.jsx';
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
  '103': {
    name: 'Room 103',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  '201': {
    name: 'Room 201',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  '301': {
    name: 'Room 301',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  '305': {
    name: 'Room 305',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  '208': {
    name: 'Room 208',
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
  '202': {
    name: 'Room 202',
    type: 'Sweet Room',
    description: 'A comfortable room with essential amenities for a relaxing stay.',
    amenities: ['Wi-Fi', 'TV'],
    capacity: 2,
    price: '₹ 750/night',
    image: sweet,
  },
  '302': {
    name: 'Room 302',
    type: 'Sweet Room',
    description: 'A comfortable room with essential amenities for a relaxing stay.',
    amenities: ['Wi-Fi', 'TV'],
    capacity: 2,
    price: '₹ 750/night',
    image: sweet,
  },
  
};

const roomNumbersByFloor = {
  'Ground Floor': ['001', '002', '003', '004', '005', '006', '007', '008'],
  'First Floor': ['101', '102', '103', '104', '105', '106', '107', '108'],
  'Second Floor': ['201', '202', '203', '204', '205', '206', '207', '208'],
  'Third Floor': ['301', '302', '303', '304', '305', '306', '307', '308'],
};

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [onHoldRooms, setOnHoldRooms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBookedRoomModalVisible, setIsBookedRoomModalVisible] = useState(false);
  const [dates, setDates] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});
  const [filter, setFilter] = useState('all');
  const [floorFilter, setFloorFilter] = useState('allFloors');
  const [roomTypeFilter, setRoomTypeFilter] = useState('allTypes');

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
      setOnHoldRooms([...onHoldRooms, selectedRoom]);
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
      setOnHoldRooms(onHoldRooms.filter(room => room !== selectedRoom));
      alert(`Room ${selectedRoom} has been released from hold.`);
    } else {
      setBookedRooms(bookedRooms.filter(room => room !== selectedRoom));
      const updatedBookingDetails = { ...bookingDetails };
      delete updatedBookingDetails[selectedRoom];
      setBookingDetails(updatedBookingDetails);
      alert(`Room ${selectedRoom} has been released.`);
    }

    setDates([]);
    setSelectedRoom(null);
    setIsBookedRoomModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsBookedRoomModalVisible(false);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleFloorChange = (floor) => {
    setFloorFilter(floor);
  };

  const handleRoomTypeChange = (value) => {
    setRoomTypeFilter(value);
  };

  const filteredRooms = Object.keys(roomDetails).filter(roomNumber => {
    const room = roomDetails[roomNumber];
    const matchesType = roomTypeFilter === 'allTypes' || room.type === roomTypeFilter;
    const matchesFloor = floorFilter === 'allFloors' || roomNumbersByFloor[floorFilter]?.includes(roomNumber);
    const matchesStatus = 
      filter === 'all' ||
      (filter === 'booked' && bookedRooms.includes(roomNumber)) ||
      (filter === 'available' && !bookedRooms.includes(roomNumber) && !onHoldRooms.includes(roomNumber)) ||
      (filter === 'onHold' && onHoldRooms.includes(roomNumber));
    
    return matchesType && matchesFloor && matchesStatus;
  });

  const getRoomDetails = (roomNumber) => roomDetails[roomNumber] || {
    ...defaultRoomDetails,
    name: `Room ${roomNumber}`,
  };

  return (
    <div>
      <Navbar />
      <RoomFilter 
        onFilterChange={handleFilterChange} 
        onFloorChange={handleFloorChange} 
        onRoomTypeChange={handleRoomTypeChange}
      />

      <div className="room-container">
        <Card title="Rooms" className="room-card">
          <Row gutter={[18, 18]}>
            {Object.keys(roomNumbersByFloor).map((floor, index) => (
              (floorFilter === 'allFloors' || floorFilter === floor) && (
                <Col span={24} key={index}>
                  <Typography.Title level={4} className="floor-title">{floor}</Typography.Title>
                  <Row gutter={16}>
                    {roomNumbersByFloor[floor]
                      .filter(roomNumber => {
                        if (filter === 'booked') return bookedRooms.includes(roomNumber);
                        if (filter === 'available') return !bookedRooms.includes(roomNumber) && !onHoldRooms.includes(roomNumber);
                        if (filter === 'onHold') return onHoldRooms.includes(roomNumber);
                        return true;
                      })
                      .filter(roomNumber => {
                        const room = getRoomDetails(roomNumber);
                        return roomTypeFilter === 'allTypes' || room.type === roomTypeFilter;
                      })
                      .map(roomNumber => {
                        const isBooked = bookedRooms.includes(roomNumber);
                        const isOnHold = onHoldRooms.includes(roomNumber);
                        const room = getRoomDetails(roomNumber);

                        return (
                          <Col key={roomNumber} span={6}>
                            <Card.Grid
                              className={`room-grid ${isBooked ? 'room-grid-booked' : ''} ${isOnHold ? 'room-grid-on-hold' : ''} ${selectedRoom === roomNumber ? 'room-grid-selected' : ''}`}
                              onClick={() => handleRoomClick(roomNumber)}
                              style={{ backgroundColor: isBooked ? 'red' : isOnHold ? 'yellow' : 'white' }}
                            >
                              {roomNumber}
                            </Card.Grid>
                          </Col>
                        );
                      })}
                  </Row>
                </Col>
              )
            ))}
          </Row>
        </Card>

        <Card title="Room Details" className="room-details-card">
          {selectedRoom ? (
            <Space direction="vertical">
              <Typography.Title level={4} className="room-details-title">{getRoomDetails(selectedRoom).name}</Typography.Title>
              <Image width={200} src={getRoomDetails(selectedRoom).image} alt={getRoomDetails(selectedRoom).name} className="room-details-image" />
              <Row gutter={16}>
                <Col span={12}>
                  <Typography.Text className="room-details-section">Type:</Typography.Text>
                  <Typography.Paragraph>{getRoomDetails(selectedRoom).type}</Typography.Paragraph>
                </Col>
                <Col span={12}>
                  <Typography.Text className="room-details-section">Price:</Typography.Text>
                  <Typography.Paragraph>{getRoomDetails(selectedRoom).price}</Typography.Paragraph>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Typography.Text className="room-details-section">Capacity:</Typography.Text>
                  <Typography.Paragraph>{getRoomDetails(selectedRoom).capacity} person(s)</Typography.Paragraph>
                </Col>
                <Col span={12}>
                  <Typography.Text className="room-details-section">Amenities:</Typography.Text>
                  <Typography.Paragraph>{getRoomDetails(selectedRoom).amenities.join(', ')}</Typography.Paragraph>
                </Col>
              </Row>
              <Typography.Text className="room-details-section">Description:</Typography.Text>
              <Typography.Paragraph>{getRoomDetails(selectedRoom).description}</Typography.Paragraph>

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
                    <Button onClick={handleHold}>Place on Hold</Button>
                  </Space>
                </Space>
              )}

              {!bookedRooms.includes(selectedRoom) && (
                <Space>
                  <Button type="primary" onClick={handleBooking}>Book</Button>
                  <Button onClick={handleHold}>Place on Hold</Button>
                </Space>
              )}
            </Space>
          ) : (
            <Typography.Paragraph>Please select a room to view its details.</Typography.Paragraph>
          )}
        </Card>
      </div>

      <Modal
        title="Book Room"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <RangePicker value={dates} onChange={handleDateChange} />
      </Modal>

      <Modal
        title="Room Already Booked"
        visible={isBookedRoomModalVisible}
        onOk={handleRelease}
        onCancel={handleCancel}
      >
        <Typography.Text>The selected room is already booked. Would you like to release it?</Typography.Text>
      </Modal>
    </div>
  );
};

export default Rooms;
