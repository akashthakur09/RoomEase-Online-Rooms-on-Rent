

// import React, { useEffect, useState } from "react";
// import Navbar from "./llnavbar";
// import '../css/homePage.css';
// import { NavLink } from "react-router-dom";
// import SharingRoomPhoto from "../data/sharing.avif";
// import axios from "axios";

// const UpdateRoom = () => {
//   const [userRooms, setUserRooms] = useState([]);
//   const token = localStorage.getItem("token"); // Get JWT token from localStorage
//   const userId = localStorage.getItem( "userId" ) ;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
        
//         const response = await axios.get("http://localhost:5000/api/room/all", {
//           headers: {
//             Authorization: `Bearer ${token}` // Include JWT token in the request headers
//           }
//         });
//         setUserRooms(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error); // Handle fetch error
//       }
//     };

//     fetchData();
//   }, [token]); // Added token to dependency array to trigger useEffect when token changes

//   const deleteRoom = async (roomId) => {
//     console.log('Deleting room with id:', roomId);
//     if (!roomId) {
//       console.error('Invalid room ID');
//       return;
//     }
//     try {
      
//       const response = await axios.delete(`http://localhost:5000/api/room/user/${roomId}`, {
//         headers: {
//           Authorization: `Bearer ${token}` // Include JWT token in the request headers
//         }
//       });
//       console.log('Room deleted successfully');
//       // Optionally, you can handle the success response here
//     } catch (error) {
//       console.error('Error deleting room:', error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="updatepagecss">
//         <button className="updatepagebtn">
//           <NavLink to="/addRoom" style={{ textDecoration: "none", color: "white" }}>
//             Add Room
//           </NavLink>
//         </button>

//         <h2>User Rooms</h2>

//         <div className='room-list'>
//           {userRooms.map((room) => (
//             <div className='room-card' key={room.id}>
//               {(room.landlord === userId) && ( // Use conditional rendering to check if the room belongs to the current landlord
//                 <>
//                   <div className='forImage'>
//                     <img src={SharingRoomPhoto} alt="Profile" className="Room-photo" />
//                   </div>
//                   <div className='roomDetails'>
//                     <p>Type: {room.type}</p>
//                     <p>Address: {room.address}</p>
//                     <p>Status: {room.status}</p>
//                     <button className="updateAndDelete_btn" onClick={() => deleteRoom(room._id)}> Delete</button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateRoom;
import React, { useEffect, useState } from "react";
import Navbar from "./llnavbar";
import '../css/homePage.css';
import { NavLink } from "react-router-dom";
import SharingRoomPhoto from "../data/sharing.avif";
import axios from "axios";

const UpdateRoom = () => {
  const [userRooms, setUserRooms] = useState([]);
  const token = localStorage.getItem("token"); // Get JWT token from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/room/all", {
          headers: {
            Authorization: `Bearer ${token}` // Include JWT token in the request headers
          }
        });
        setUserRooms(response.data);
      } catch (error) {
        console.error('Error fetching data:', error); // Handle fetch error
      }
    };

    fetchData();
  }, [token]); // Added token to dependency array to trigger useEffect when token changes

  const deleteRoom = async (roomId) => {
    console.log('Deleting room with id:', roomId);
    if (!roomId) {
      console.error('Invalid room ID');
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:5000/api/room/user/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include JWT token in the request headers
        }
      });
      console.log('Room deleted successfully');
      // Optionally, you can handle the success response here
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="updatepagecss">
        <button className="updatepagebtn">
          <NavLink to="/addRoom" style={{ textDecoration: "none", color: "white" }}>
            Add Room
          </NavLink>
        </button>

        <h2>User Rooms</h2>

        <div className='room-list'>
          {userRooms.map((room) => (
            // Use conditional rendering to check if the room belongs to the current landlord and if all required fields are present
            (room.landlord === userId && room.type && room.address && room.status) && (
              <div className='room-card' key={room._id}>
                <div className='forImage'>
                  <img src={SharingRoomPhoto} alt="Profile" className="Room-photo" />
                </div>
                <div className='roomDetails'>
                  <p>Type: {room.type}</p>
                  <p>Address: {room.address}</p>
                  <p>City: {room.city}</p>
                  <p>Status: {room.status}</p>
                  <button className="updateAndDelete_btn" onClick={() => deleteRoom(room._id)}> Delete</button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
