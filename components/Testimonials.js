'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import '../public/css/Testimonials.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]); // ✅ start with an empty array

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://techzenondev.com/apnatai/api/reviews/home');
        if (response.data?.status && Array.isArray(response.data?.data?.data)) {
          setTestimonials(response.data.data.data);
        } else if (response.data?.status && Array.isArray(response.data?.data)) {
          setTestimonials(response.data.data);
        } else {
          console.warn('Unexpected API structure:', response.data);
          setTestimonials([]); 
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]); 
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
    appendDots: dots => (
      <div className="custom-dots">
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="testimonials-wrapper">
      <div className="fancy-mainheading">
        <h2>Happy Clients <span>Say About Us</span></h2>
      </div>

      {testimonials.length > 0 ? (
        <Slider {...settings} className="testimonialscustom" style={{maxWidth:'1200px',margin:'auto'}}>
          {testimonials.map((item, index) => (
            <div className="testimonial-card-old" key={index}>
              <div className="imagearea">
                <div className="testimonial-image-wrapper">
                  <Image
  src={
    item.image
      ? `https://techzenondev.com/apnatai/public/${item.image}`  
      : '/images/testi1.jpg'                              
  }
  width={120}
  height={120}
  alt={item.name || 'Customer'}
  className="testimonial-image"
/>
                </div>
                <div className="testimonial-stars">
                  {'★'.repeat(item.rating || 5)}
                </div>
              </div>
              <div className="testimonial-card-content">
                <p
                  className="testimonial-text" style={{color:'#000',lineHeight:'20px'}}
                  dangerouslySetInnerHTML={{ __html: item.review || '' }}
                />
                <div className="testimonial-footer" style={{display:'flex',justifyContent: 'space-between'}}>
                  <div className="testidivcustom">
                  <h3>{item.name || 'Anonymous'}</h3>
                  <p style={{color:'#000',lineHeight:'20px'}}>{item.position || 'Happy Customer'}</p></div>
                  <div className="quote-icon" style={{position: 'relative',bottom:'0px'}}>❞</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="loading-text">Loading testimonials...</p>
      )}
    </div>
  );
}
