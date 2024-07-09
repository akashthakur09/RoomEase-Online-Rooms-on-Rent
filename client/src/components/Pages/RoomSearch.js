// import React, { useState, useEffect } from 'react';
// import Navbar from './navbar';
// import Footer from './footer';
// import '../css/RoomSearch.css';
// import SharingRoomPhoto from "../data/sharing.avif";
// import axios from 'axios';

// const ExploreRoom = () => {
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedRoomType, setSelectedRoomType] = useState('');
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     const fetchRooms = async () => {
//       try {
//         let url = "api/room/all";
//         if (selectedCity || selectedRoomType) {
//           url += "?";
//           if (selectedCity) url += `city=${selectedCity}`;
//           if (selectedRoomType) {
//             if (selectedCity) url += "&";
//             url += `type=${selectedRoomType}`;
//           }
//         }

//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         setRooms(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//   }, [selectedCity, selectedRoomType]);

//   const handleCityChange = (city) => {
//     setSelectedCity(city);
//   };

//   const handleRoomTypeChange = (type) => {
//     setSelectedRoomType(type);
//   };

//   const request = async (roomId) => {
//     const userId = localStorage.getItem("userId");
//     const status = "pending";

//     try {
//       const roomResponse = await axios.get(`api/room/${roomId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       const roomData = roomResponse.data;

//       const response = await axios.post("api/request/create", {
//         tenant: userId,
//         room: roomId,
//         status: status,
//         landlord: roomData.landlord,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       console.log('Request successfully stored in the database!');
//     } catch (error) {
//       console.error("Error making the request:", error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className='explore-room-page' style={{overflow:"auto"}}>
//         <div className='search-box'>
//           <div className='city-selection'>
//             <h3>City:</h3>
//             <select value={selectedCity} onChange={(e) => handleCityChange(e.target.value)}>
//               <option value=''>All Cities</option>
//               <option value='indore'>Indore</option>
//               <option value='bhopal'>Bhopal</option>
//             </select>
//           </div>

//           <div className='room-type-filter'>
//             <h3>Room Type:</h3>
//             <select value={selectedRoomType} onChange={(e) => handleRoomTypeChange(e.target.value)}>
//               <option value=''>All Types</option>
//               <option value='single'>Single Room</option>
//               <option value='sharing'>Sharing Room</option>
//               <option value='apartment'>Apartment</option>
//             </select>
//           </div>
//         </div>

//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error: {error}</p>
//         ) : (
//           <div className='room-list'>
//             {rooms.map((room) => (
//               <div className='room-card' key={room._id}>
//                 <div className='forImage'>
//                   <img src={SharingRoomPhoto} alt="Room" className="Room-photo" />
//                 </div>
//                 <div className='roomDetails'>
//                   <p>Type: {room.type}</p>
//                   <p>Address: {room.address}</p>
//                   <p>City: {room.city}</p>
//                   <p>Status: {room.status}</p>
//                   <button className='searchBookBtn' onClick={() => request(room._id)}>Book</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ExploreRoom;

import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import '../css/RoomSearch.css';
import SharingRoomPhoto from "../data/sharing.avif";
import axios from 'axios';

const ExploreRoom = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchRooms = async () => {
      try {
        let url = "api/room/all";
        if (selectedCity || selectedRoomType) {
          url += "?";
          if (selectedCity) url += `city=${selectedCity}`;
          if (selectedRoomType) {
            if (selectedCity) url += "&";
            url += `type=${selectedRoomType}`;
          }
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        let arr = response.data;
        console.log('Fetched Rooms:', arr);
        
        setRooms(arr);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [selectedCity, selectedRoomType]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleRoomTypeChange = (type) => {
    setSelectedRoomType(type);
  };

  const request = async (roomId) => {
    const userId = localStorage.getItem("userId");
    const status = "pending";

    try {
      const roomResponse = await axios.get(`api/room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const roomData = roomResponse.data;

      const response = await axios.post("api/request/create", {
        tenant: userId,
        room: roomId,
        status: status,
        landlord: roomData.landlord,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Request successfully stored in the database!');
    } catch (error) {
      console.error("Error making the request:", error);
    }
  };

  useEffect(() => {
    console.log('Rooms state updated:', rooms);
    
  }, [rooms]);

  return (
    <div>
      <Navbar />
      <div className='explore-room-page' style={{overflow:"auto"}}>
        <div className='search-box'>
          <div className='city-selection'>
            <h3>City:</h3>
            <select value={selectedCity} onChange={(e) => handleCityChange(e.target.value)}>
              <option value=''>All Cities</option>
              <option value='indore'>Indore</option>
              <option value='bhopal'>Bhopal</option>
              {/* Add more options for other cities */}
            </select>
          </div>

          <div className='room-type-filter'>
            <h3>Room Type:</h3>
            <select value={selectedRoomType} onChange={(e) => handleRoomTypeChange(e.target.value)}>
              <option value=''>All Types</option>
              <option value='single'>Single Room</option>
              <option value='sharing'>Sharing Room</option>
              <option value='apartment'>Apartment</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className='room-list'>
            {rooms.map((room) => (
              // Ensure that room.id is defined and unique
              <div className='room-card' key={room._id}>
                <div className='forImage'>
                  <img src={SharingRoomPhoto} alt="Room" className="Room-photo" />
                </div>
                <div className='roomDetails'>
                  <p>Type: {room.type}</p>
                  <p>Address: {room.address}</p>
                  <p>City: {room.city}</p>
                  <p>Status: {room.status}</p>
                  <button className='searchBookBtn' onClick={() => request(room._id)}>Book</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ExploreRoom;
