"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../../public/css/businessevents.css";

const API_URL = "https://techzenondev.com/apnatai/api/forowner/1/edit";
const IMAGE_BASE = "https://techzenondev.com/apnatai/storage/app/public/";

// inject CSS inside HTML string so it overrides inline margins
const withInjectedStyles = (html) => {
  const css = `
    <style>
      .events-right .event-card h3{
        margin-top: 20px !important;
        margin-bottom: 0 !important;
      }
    </style>
  `;
  return `${css}${html || ""}`;
};

const Html = ({ className, html }) => {
  if (!html) return null;
  const cleaned = String(html).trim();
  if (!cleaned || cleaned === "<p></p>" || cleaned === ",") return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: withInjectedStyles(cleaned) }}
    />
  );
};

const BusinessEvents = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;
  if (!page) return <p>No data</p>;

  const img = page.section12_image ? `${IMAGE_BASE}${page.section12_image}` : null;
  const btnText = page.section12_button_text || "Get A Free Consultation";
  const btnLink = page.section12_button_link || "#";

  return (
    <section className="events-section">
      <div className="events-header">
        <h1>
          List Rental Property in Natai, <span className="highlight"> Phang-nga</span>
        </h1>
      </div>

      <div className="events-body">
        <div className="events-image" style={{paddingTop:'20px'}}>
          {img ? <Image src={img} alt="Section 12" width={600} height={400} /> : null}
          <br />
          <br />
          <a className="learn-btn" href={btnLink}>
            {btnText}
          </a>
        </div>

        <div className="events-right">
          <Html html={page.section12_description} />
        </div>
      </div>
    </section>
  );
};

export default BusinessEvents;
