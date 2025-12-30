import React from 'react';
import '../../public/css/AboutSection.css'; 
import aboutimg from '../../public/images/about.png';
import Image from 'next/image';


const AboutSection = () => {
  return (
    <>
    <section className="about-section">
      <div className="about-container">
        {/* Left: Image */}
        <div className="about-image">
            <Image src={aboutimg} alt="Luxury Villa" width={600} height={400} />
          
        </div>

        {/* Right: Content */}
        <div className="about-content">
        
          <h2 className="about-title">
            Unlocking the Luxurious Secrets of Natai, Phang-Nga with AP-Natai
          </h2>
          <p className="about-description">
         Natai, Phang-nga, a serene paradise nestled along the west coast of Thailand, offers an exquisite blend of pristine beaches, lush landscapes, and lucrative real estate opportunities.
            </p>
          <p className="about-description">
          With its tranquil environments juxtaposed against robust property development, Natai has seamlessly intertwined tranquility with opulent living, emerging as a sought-after locale for investors and tranquility-seekers alike. AP-Natai, a pillar in this serene environment, plays a pivotal role in not only elevating the property market but also embedding sustainability and community into the luxurious lifestyle of Natai.
           </p>
          
        </div>
      </div>
      
    </section>

    <section className="about-section">
      <div style={{width:'100%'}}>
       

        {/* Right: Content */}
        <div className="about-content" style={{width:'100%',width:'1200px',margin:'auto'}}>
        
          <h2 className="about-title">
           The Allure of Natai
          </h2>
          <p className="about-description">
         Natai, Phang-nga, a serene paradise nestled along the west coast of Thailand, offers an exquisite blend of pristine beaches, lush landscapes, and lucrative real estate opportunities.
            </p>
          <p className="about-description">
          With its tranquil environments juxtaposed against robust property development, Natai has seamlessly intertwined tranquility with opulent living, emerging as a sought-after locale for investors and tranquility-seekers alike. AP-Natai, a pillar in this serene environment, plays a pivotal role in not only elevating the property market but also embedding sustainability and community into the luxurious lifestyle of Natai.
           </p>
          
        </div>
         {/* <div className="about-content" style={{width:'100%',width:'1200px',margin:'auto'}}>
        
          <h2 className="about-title">
           The Allure of Natai
          </h2>
          <p className="about-description">
         Natai, Phang-nga, a serene paradise nestled along the west coast of Thailand, offers an exquisite blend of pristine beaches, lush landscapes, and lucrative real estate opportunities.
            </p>
          <p className="about-description">
          With its tranquil environments juxtaposed against robust property development, Natai has seamlessly intertwined tranquility with opulent living, emerging as a sought-after locale for investors and tranquility-seekers alike. AP-Natai, a pillar in this serene environment, plays a pivotal role in not only elevating the property market but also embedding sustainability and community into the luxurious lifestyle of Natai.
           </p>
          
        </div> */}
      </div>
      
    </section>
    </>
)};

export default AboutSection;