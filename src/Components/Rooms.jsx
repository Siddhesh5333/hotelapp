import React, { useState } from 'react';
import { Card, Col, Row, Typography, Space, Image, Button, Modal, DatePicker, Input, Select } from 'antd';
import './Rooms.css';
import Navbar from './Navbar.jsx';
import RoomFilter from './RoomFilter.jsx';
import sweet from './images/sweet.jpg';
import standard from './images/standard.png';
import delux from './images/delux.png';
import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;

const defaultRoomDetails = {
  name: 'Room 002',
  type: 'Standard Room',
  description: 'A standard room with basic amenities.',
  amenities: ['Wi-Fi', 'TV'],
  capacity: 2,
  price: '₹ 500/night',
  image: standard, 
};

const roomDetails = {
  'Delux 001': {
    name: 'Room 001',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  'Delux 008': {
    name: 'Room 008',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  'Delux 105': {
    name: 'Room 105',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  'Delux 201': {
    name: 'Room 201',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  'Delux 208': {
    name: 'Room 208',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  'Delux 301': {
    name: 'Room 301',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  'Delux 308': {
    name: 'Room 308',
    type: 'Delux Room',
    description: 'A cozy, comfortable room with a modern interior.',
    amenities: ['Wi-Fi', 'TV', 'Mini Fridge'],
    capacity: 2,
    price: '₹ 1000/night',
    image: delux,
  },
  'Sweet 004': {
    name: 'Room 004',
    type: 'Sweet Room',
    description: 'Spacious room with beautiful city views.',
    amenities: ['Wi-Fi', 'TV', 'Balcony'],
    capacity: 3,
    price: '₹ 750/night',
    image: sweet,
  },
  'Sweet 005': {
    name: 'Room 005',
    type: 'Sweet Room',
    description: 'Spacious room with beautiful city views.',
    amenities: ['Wi-Fi', 'TV', 'Balcony'],
    capacity: 3,
    price: '₹ 750/night',
    image: sweet,
  },
  'Sweet 101': {
    name: 'Room 101',
    type: 'Sweet Room',
    description: 'Spacious room with beautiful city views.',
    amenities: ['Wi-Fi', 'TV', 'Balcony'],
    capacity: 3,
    price: '₹ 750/night',
    image: sweet,
  },
  'Sweet 108': {
    name: 'Room 108',
    type: 'Sweet Room',
    description: 'A comfortable room with essential amenities for a relaxing stay.',
    amenities: ['Wi-Fi', 'TV'],
    capacity: 2,
    price: '₹ 750/night',
    image: sweet,
  },
  'Sweet 205': {
    name: 'Room 205',
    type: 'Sweet Room',
    description: 'A comfortable room with essential amenities for a relaxing stay.',
    amenities: ['Wi-Fi', 'TV'],
    capacity: 2,
    price: '₹ 750/night',
    image: sweet,
  },
  'Sweet 305': {
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
  'Ground Floor': ['Delux 001', 'Standard 002', 'Standard 003', 'Sweet 004', 'Sweet 005', 'Standard 006', 'Standard 007', 'Delux 008'],
  'First Floor': ['Sweet 101', 'Standard 102', 'Standard 103', 'Standard 104', 'Delux 105', 'Standard 106', 'Standard 107', 'Sweet 108'],
  'Second Floor': ['Delux 201', 'Standard 202', 'Standard 203', 'Standard 204', 'Sweet 205', 'Standard 206', 'Standard 207', 'Delux 208'],
  'Third Floor': ['Delux 301', 'Standard 302', 'Standard 303', 'Standard 304', 'Sweet 305', 'Standard 306', 'Standard 307', 'Delux 308'],
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
  const [guestName, setGuestName] = useState('');
  const [guestAge, setGuestAge] = useState('');
  const [guestGender, setGuestGender] = useState('');

  const handleRoomClick = (roomNumber) => {
    setSelectedRoom(roomNumber);
    if (bookedRooms.includes(roomNumber)) {
      const roomBooking = bookingDetails[roomNumber];
      setDates([roomBooking.checkIn, roomBooking.checkOut]);
      setGuestName(roomBooking.guestName);
      setGuestAge(roomBooking.guestAge);
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

  const handleGenderChange = (value) => setGuestGender(value);

    const handleOk = () => {
    if (!guestName || !guestAge || !guestGender || dates.length !== 2) {
      alert("Please fill in all fields (Check-in, Check-out, Guest Name, Age, and Gender).");
      return;
    }
    if (selectedRoom && dates.length === 2) {
      setBookedRooms([...bookedRooms, selectedRoom]);
      setBookingDetails({
        ...bookingDetails,
        [selectedRoom]: {
          checkIn: dates[0],
          checkOut: dates[1],
          guestName,
          guestAge,
          guestGender,
        },
      });
      setIsModalVisible(false);
      alert(`Room ${selectedRoom} booked from ${dates[0].format('YYYY-MM-DD')} to ${dates[1].format('YYYY-MM-DD')}`);
      setGuestName('');
      setGuestAge('');
      setGuestGender('');
      setDates([]);
    }
  };
  const handleGuestNameChange = (e) => setGuestName(e.target.value);
  const handleGuestAgeChange = (e) => setGuestAge(e.target.value);

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
    setGuestName('');
    setGuestAge('');
    setSelectedRoom(null);
    setIsBookedRoomModalVisible(false);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setGuestName('');
    setGuestAge('');
    setGuestGender('');
    setDates([]);
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
                  <Row gutter={16} className='custom-grid'>
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
                          className={`room-grid ${isBooked ? 'room-grid-booked' : ''} ${isOnHold ? 'room-grid-hold ' : ''} ${selectedRoom === roomNumber ? 'room-grid-selected' : ''}`}
                          onClick={() => handleRoomClick(roomNumber)}
                          style={{
                          backgroundColor: isBooked ? '#32CD32' : isOnHold ? '#FF8C00' : 'green', // Background color logic
                          color: isOnHold || isBooked ? 'black' : '#333', // Text color adjustment
                        }}
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
                  <strong>Guest Name:</strong> {bookingDetails[selectedRoom].guestName}
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                  <strong>Guest Age:</strong> {bookingDetails[selectedRoom].guestAge}
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                  <strong>Guest Gender:</strong> {bookingDetails[selectedRoom].guestGender}
                  </Typography.Paragraph>
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
        title={`Book Room ${selectedRoom}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm Booking"
      >
        <Space direction="vertical" size="large">
          <RangePicker
            value={dates}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            disabledDate={(current) => current && current < moment().startOf('day')}
          />
          <Input placeholder="Guest Name" value={guestName} onChange={handleGuestNameChange} />
          <Input placeholder="Guest Age" value={guestAge} onChange={handleGuestAgeChange} type="number" />
          <Select
          placeholder="Select Gender"  // Placeholder will be visible until an option is selected
          value={guestGender || undefined}  // Undefined value allows placeholder to show
          onChange={handleGenderChange}
          style={{ width: '60%' }}
          >
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Other">Other</Option>
        </Select>
        </Space>
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
