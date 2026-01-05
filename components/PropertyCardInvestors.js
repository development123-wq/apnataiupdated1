"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import "../public/css/PropertyCardGuest.css";

const API_URL = "https://techzenondev.com/apnatai/api/forinvestor/1/edit";
const IMAGE_BASE = "https://techzenondev.com/apnatai/storage/app/public/";

const AfterTwoWordsAccent = ({ text, accentColor = "#00e2ee" }) => {
  if (!text) return null;

  const words = String(text).trim().split(/\s+/);
  const first = words.slice(0, 2).join(" ");
  const rest = words.slice(2).join(" ");

  if (!rest) return <>{first}</>;

  return (
    <>
      {first} <span style={{ color: accentColor }}>{rest}</span>
    </>
  );
};

const stripHtml = (html) => {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
};

const PropertyCard = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState({});

  const handleToggle = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const res = await fetch(API_URL, {
          method: "GET",
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          setPage(null);
          return;
        }

        const json = await res.json();
        setPage(json?.data || null);
      } catch (e) {
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const cards = useMemo(() => {
    if (!page) return [];

    return [
      {
        id: 1,
        image: page.section11_left_image,
        title: page.section11_left_title,
        description: stripHtml(page.section11_left_description),
        listItems: Array.isArray(page.section11_left_tags) ? page.section11_left_tags : [],
      },
      {
        id: 2,
        image: page.section11_middle_image,
        title: page.section11_middle_title,
        description: stripHtml(page.section11_middle_description),
        listItems: Array.isArray(page.section11_middle_tags) ? page.section11_middle_tags : [],
      },
      {
        id: 3,
        image: page.section11_right_image,
        title: page.section11_right_title,
        description: stripHtml(page.section11_right_description),
        listItems: Array.isArray(page.section11_right_tags) ? page.section11_right_tags : [],
      },
    ].filter((c) => c.title || c.description || c.image);
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (!page) return <p>No data</p>;

  const heroImg = page.section10_image ? `${IMAGE_BASE}${page.section10_image}` : null;
  const heading = page.section13_title || "";

  return (
    <>
      {/* Banner with black overlay */}
      <div className="image-guest" style={{ position: "relative",marginTop:'40px' }}>
        {heroImg ? (
          <>
            <Image
              src={heroImg}
              alt="Section 10"
              fill
              className="property-image"
              style={{ zIndex: 1, objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                zIndex: 2,
              }}
            />
          </>
        ) : (
          <p></p>
        )}
      </div>

      {/* ✅ Overlap this section on banner */}
      <div
        className="property-container custom-sec-two investers-bottom"
        style={{
          position: "relative",
          zIndex: 5,
          marginTop: "-120px",  // overlap amount (adjust)
          paddingTop: "120px", 
          background:'none!important'
        }}
      >
        {/* Heading only if exists */}
        {heading ? (
          <div className="fancy-mainheading fancy-mainheading-two" style={{ background: "none" }}>
            <h2 className="typing-text">
              <AfterTwoWordsAccent text={heading} accentColor="#00e2ee" />
            </h2>
          </div>
        ) : null}

        {cards.map((property) => {
          const imgSrc = property.image ? `${IMAGE_BASE}${property.image}` : null;
          const first3 = property.listItems.slice(0, 3);
          const rest = property.listItems.slice(3);

          return (
            <div className="property-card" key={property.id}>
              <div className="image-wrapper">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={property.title || "Property"}
                    fill
                    className="property-image"
                  />
                ) : null}
              </div>

              <div className="property-content">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-description">{property.description}</p>

                <ul className="property-list">
                  {first3.map((item, index) => (
                    <li key={index} className="list-item">
                      {item}
                    </li>
                  ))}
                </ul>

                {property.listItems.length > 3 && (
                  <>
                    {showMore[property.id] && (
                      <ul className="property-list">
                        {rest.map((item, index) => (
                          <li key={index} className="list-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      className={`read-more-btn ${showMore[property.id] ? "collapsed" : ""}`}
                      onClick={() => handleToggle(property.id)}
                    >
                      {showMore[property.id] ? "Show Less" : "Read More"}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PropertyCard;
