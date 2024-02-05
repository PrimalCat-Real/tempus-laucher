'use client'

import { useEffect } from 'react';
import { redirect } from 'next/navigation';



// export const TEMPUS_PATH = localStorage.getItem('gameFolderPath');


// export const getVanillaPath = () => {
  
//   return `${TEMPUS_PATH}/instances/Vanilla`;
// };

// // minecraft paths
// export const getDatastorePath = () => {
//   const TEMPUS_PATH = localStorage.getItem('gameFolderPath');
//   return `${TEMPUS_PATH}/datastore`;
// };

// export const getJava17Path = () => {
//   const TEMPUS_PATH = localStorage.getItem('gameFolderPath');
//   return `${TEMPUS_PATH}/java/17.0.1+12`;
// };


export default function Home() {
  useEffect(() => {
    // This code will run on the client side
    const userName = localStorage.getItem('userName');
    if (userName !== null) {
      // Redirect to servers if userName is not null
      redirect('/servers');
    } else {
      // Redirect to login if userName is null
      redirect('/login');
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return null; // You can render some content here if needed
}