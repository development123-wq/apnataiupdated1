import React from 'react';
import '../../public/css/AboutSection.css'; 
import aboutimg from '../../public/images/about.png';
import Image from 'next/image';


const WhyUs = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        

        {/* Right: Content */}
        <div className="about-content">
          <h2 className="about-title">
            Why Choose AP Natai ?
          </h2>
          <p className="about-description">
            Welcome To AP Natai, Your Premier Partner In Luxury Real Estate Within The Serene Locale Of Natai, Phang-Nga. Our Presence In The Market Is Not Just About Property Transactions; It’s About Crafting A Lifestyle That Resonates With Tranquility And Sophistication.
          </p>
          <p className="about-description">
            We’ve Lived In Natai For 20+ Years And Have Built A Reputation Based On Trust And Responsibility, Never Disappointing Our Neighbors.
          </p>
          {/* <p className="about-description">
            We’ve Lived In Natai For 20+ Years And Have Built A Reputation Based On Trust And Responsibility, Never Disappointing Our Neighbors.
          </p>
          <p className="about-description">
            We’ve Lived In Natai For 20+ Years And Have Built A Reputation Based On Trust And Responsibility, Never Disappointing Our Neighbors.
          </p> */}
          
        </div>
        {/* Left: Image */}
        <div className="about-image">
            <Image src={aboutimg} alt="Luxury Villa" width={600} height={400} />
          
        </div>
      </div>
    </section>
  );
};

export default WhyUs;