import React, { useEffect, useContext } from 'react';
import { Table } from 'antd';
import BookingContext from './BookingContext';

const RoomReport = () => {
  const { bookings, setBookings } = useContext(BookingContext);

  // Log bookings to confirm data is coming from the context
  console.log("Bookings from context:", bookings);

  // If no bookings are in context, let's set mock data
  useEffect(() => {
    if (bookings.length === 0) {
      const mockData = [
        { id: 1, roomNumber: '101', floor: '1', roomType: 'Single', status: 'Available', bookedBy: 'John Doe', bookingDate: '2024-12-01' },
        { id: 2, roomNumber: '102', floor: '1', roomType: 'Double', status: 'Booked', bookedBy: 'Jane Smith', bookingDate: '2024-12-02' },
      ];
      setBookings(mockData); // Setting mock data to bookings state
    }
  }, [bookings, setBookings]);

  const columns = [
    { title: 'Room Number', dataIndex: 'roomNumber', key: 'roomNumber' },
    { title: 'Floor', dataIndex: 'floor', key: 'floor' },
    { title: 'Room Type', dataIndex: 'roomType', key: 'roomType' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Booked By', dataIndex: 'bookedBy', key: 'bookedBy' },
    { title: 'Booking Date', dataIndex: 'bookingDate', key: 'bookingDate' },
  ];

  return (
    <div>
      <h2>Booking Details Report</h2>
      {/* Ensure bookings is populated */}
      <Table dataSource={bookings} columns={columns} rowKey="id" />
    </div>
  );
};

export default RoomReport;
