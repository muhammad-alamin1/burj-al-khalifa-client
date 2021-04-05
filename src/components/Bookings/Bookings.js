import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email=' + loggedInUser.email,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            },

        })
            .then(response => response.json())
            .then(data =>{
                setBookings(data)
            })
    },[])
    return (
        <div>
            <h3>You have: {bookings.length} bookings</h3>
            {
                bookings.map(book=><li key={book._id}>Name: {book.name} From: {book.checkIn} to: {book.checkOut}</li>)
            }
        </div>
    );
};

export default Bookings;