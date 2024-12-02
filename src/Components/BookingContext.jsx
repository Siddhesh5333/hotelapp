import React, { createContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Retrieve bookings from localStorage or sessionStorage on initial render
  const initialBookings = JSON.parse(localStorage.getItem('bookings')) || [];

  const [bookings, setBookings] = useState(initialBookings);

  // Use useEffect to save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem('bookings', JSON.stringify(bookings));  // Persist bookings
    }
  }, [bookings]);

  // Log bookings to see if data is correctly updated
  console.log("Bookings:", bookings);

  return (
    <BookingContext.Provider value={{ bookings, setBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
