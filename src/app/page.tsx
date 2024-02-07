'use client'

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { checkUpdate, onUpdaterEvent } from '@tauri-apps/api/updater';


// console.log("test");

// onUpdaterEvent(({ error, status }) => {
// // This will log all updater events, including status updates and errors.
// console.log('Updater event', error, status)
// })

export default function Home() {
  
  useEffect(() => {

    const fetchUpdates = async () => {
      try {
        const { shouldUpdate, manifest } = await checkUpdate();
        console.log("shouldUpdate:", shouldUpdate);
        console.log("manifest:", manifest);
        alert(shouldUpdate)
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();
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