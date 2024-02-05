'use client'

import React, { useEffect, useState } from 'react';

const User = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch the username from local storage on component mount
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  return (
    <div className='w-auto'>{userName}</div>
  );
};

export default User;