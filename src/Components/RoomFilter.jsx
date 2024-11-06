import React from 'react';
import { Select, Space } from 'antd';

const { Option } = Select;

const RoomFilter = ({ onFilterChange, onFloorChange, onRoomTypeChange }) => {
  const floors = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'];
  const roomTypes = ['Standard Room', 'Delux Room', 'Sweet Room'];

  return (
    <div className="room-filter">
      <Space>
        {/* Filter for Room Status */}
        <Select
          placeholder="Select Room Status"
          style={{ width: 160 }}
          onChange={(value) => onFilterChange(value)}
        >
          <Option value="all">All Rooms</Option>
          <Option value="booked">Booked Rooms</Option>
          <Option value="available">Available Rooms</Option>
          <Option value="onHold">On Hold Rooms</Option>
        </Select>

        {/* Filter for Floor */}
        <Select
          placeholder="Select Floor"
          style={{ width: 160 }}
          onChange={(value) => onFloorChange(value)}
        >
          <Option value="allFloors">All Floors</Option>
          {floors.map((floor, index) => (
            <Option key={index} value={floor}>
              {floor}
            </Option>
          ))}
        </Select>

        {/* Filter for Room Type */}
        <Select
          placeholder="Select Room Type"
          style={{ width: 160 }}
          onChange={(value) => onRoomTypeChange(value)}
        >
          <Option value="allTypes">All Types</Option>
          {roomTypes.map((type, index) => (
            <Option key={index} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Space>
    </div>
  );
};

export default RoomFilter;
