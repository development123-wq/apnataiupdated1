'use client';
import "../../app/globals.css";
import Image from 'next/image';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InnerBanner from '../../components/InnerBanner';
import aboutimg from '../../public/images/images/viva.webp';
import '../../public/css/forguests.css';
import ForRentals from '../../components/ForInvesters/ForGuests';
import Card from "../../components/PropertyCardInvestors";

const ForRental = () => {
  return (
    <>
      <Header/>
      <InnerBanner/>
   <ForRentals/>
   <Card/>
      <Footer/>
    </>
  );
};

export default ForRental;
