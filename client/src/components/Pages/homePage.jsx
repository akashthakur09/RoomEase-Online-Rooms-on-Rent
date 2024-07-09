import React from 'react';
import '../css/homePage.css';
import Navbar from './navbar';
import Contact from './footer'
import { NavLink } from "react-router-dom";
import SingleRoomPhoto from "../data/single.jpeg"
import SharingRoomPhoto from "../data/sharing.avif"
import ApartmentRoomPhoto from "../data/apartment.jpeg"


function Homepage() {
  return (
    <div>
      <Navbar />
      <div className='home'>
        <div className='home-content'>
          <h1>Welcome to Room Rent Service</h1>
          <p>Find your perfect room and leave your reviews</p>
          <button className='home-button'><NavLink to="/search" style={{textDecoration:'none' , color:'#f20674'}}>Explore Rooms</NavLink></button>
        </div>
      </div>
      <section className='section'>
        <div className='card'>
        <img src={SingleRoomPhoto} alt="Profile" className="Room-photo" />
          {/* Card content */}
        </div>
        <div className='section-paragraph'>
          {/* Paragraph content */}
          <h2 className='roomhead'>Single Rooms</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Amet adipisci necessitatibus cupiditate, laborum sapiente
            corrupti aliquid id? Distinctio, rerum quibusdam!</p>
            <button className='booking-button'><NavLink to="/search" style={{textDecoration:'none' , color:'#f20674'}}>Book Now</NavLink></button>
        </div>
      </section>
      <section className='section-2'>
        <div className='card-2'>
         
          {/* Card content */}
          <h2 className='roomhead'>Shared Rooms</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Amet adipisci necessitatibus cupiditate, laborum sapiente
            corrupti aliquid id? Distinctio, rerum quibusdam!</p>
            <button className='booking-button'><NavLink to="/search" style={{textDecoration:'none' , color:'#f20674'}}>Book Now</NavLink></button>
        </div>
        <div className='section-paragraph-2'>
        <img src={SharingRoomPhoto} alt="Profile" className="Room-photo" />
         
          {/* Paragraph content */}
        </div>
      </section>
      <section className='section'>
        <div className='card'>
        <img src={ApartmentRoomPhoto} alt="Profile" className="Room-photo" />
          
          {/* Card content */}
        </div>
        <div className='section-paragraph'>
          {/* Paragraph content */}
          <h2 className='roomhead'>Apartments</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Amet adipisci necessitatibus cupiditate, laborum sapiente
            corrupti aliquid id? Distinctio, rerum quibusdam!</p>
          <button className='booking-button'><NavLink to="/search" style={{textDecoration:'none' , color:'#f20674'}}>Book Now</NavLink></button>
        </div>
      </section>
      <Contact />
    </div>
  );
}

export default Homepage;
