"use client";

import React, { useEffect, useMemo, useState } from "react";
import "../../public/css/forguests.css";
import Image from "next/image";

const API_URL = "https://techzenondev.com/apnatai/api/forowner/1/edit";
const IMAGE_BASE = "https://techzenondev.com/apnatai/storage/app/public/";

const Html = ({ className, html }) => {
  if (!html) return null;
  const cleaned = String(html).trim();
  if (!cleaned || cleaned === "<p></p>" || cleaned === ",") return null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: cleaned }} />;
};

// comma ke baad sirf 2 words accent
const TitleAccentTwoWords = ({ text, accentColor = "#00e2ee" }) => {
  if (!text) return null;

  const str = String(text);
  const commaIndex = str.indexOf(",");

  if (commaIndex === -1) return <>{str}</>;

  const before = str.slice(0, commaIndex).trim();
  const after = str.slice(commaIndex + 1).trim();
  if (!after) return <>{before}</>;

  const words = after.split(/\s+/); // [web:105]
  const firstTwo = words.slice(0, 2).join(" ");
  const rest = words.slice(2).join(" ");

  return (
    <>
      {before}
      {", "}
      <span style={{ color: accentColor }}>{firstTwo}</span>
      {rest ? ` ${rest}` : ""}
    </>
  );
};

const InvestorSection = ({ page, n }) => {
  const maintitle = page?.[`section${n}_maintitle`];
  const image = page?.[`section${n}_image`];
  const title = page?.[`section${n}_title`];
  const description = page?.[`section${n}_description`];

  const buttonText = page?.[`section${n}_button_text`] || "Let's Talk";
  const buttonLink = page?.[`section${n}_button_link`] || "/contact";

  const leftTitle = page?.[`section${n}_lefttab_title`];
  const leftDesc = page?.[`section${n}_lefttab_description`];
  const middleTitle = page?.[`section${n}_middletab_title`];
  const middleDesc = page?.[`section${n}_middletab_description`];
  const rightTitle = page?.[`section${n}_righttab_title`];
  const rightDesc = page?.[`section${n}_righttab_description`];

  if (!maintitle && !title && !description && !image) return null;

  return (
    <section className="business-section">
      <h2
        className="titleheadingowners"
        style={{ width: "100%", textAlign: "center", fontSize: "35px", paddingTop: "30px" }}
      >
        {maintitle}
      </h2>

      <div className="business-top">
        <div className="business-image">
          {image ? (
            <Image
              src={`${IMAGE_BASE}${image}`}
              alt={maintitle || "Business"}
              width={700}
              height={500}
            />
          ) : null}
        </div>

        <div className="business-content">
          <h1 style={{fontSize: '2rem'}}>
            <TitleAccentTwoWords text={title} accentColor="#00e2ee" />
          </h1>

          <Html className="description-custom" html={description} />

          <a className="learn-btn" href={buttonLink}>
            {buttonText}
          </a>
        </div>
      </div>

      <div className="business-bottom">
        <div className="bottom-card">
          <h3>{leftTitle}</h3>
          <Html html={leftDesc} />
        </div>

        <div className="bottom-card">
          <h3>{middleTitle}</h3>
          <Html html={middleDesc} />
        </div>

        <div className="bottom-card">
          <h3>{rightTitle}</h3>
          <Html html={rightDesc} />
        </div>
      </div>
    </section>
  );
};

export default function ForGuests() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  // tumne bola insert rules 4/6/7 pe, so 1-7 map hi rakha
  const sections = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8], []);

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
          console.log("API failed:", res.status);
          setPage(null);
          return;
        }

        const json = await res.json();
        setPage(json?.data || null);
      } catch (e) {
        console.log("Fetch error:", e);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!page) return <p>No data</p>;

  return (
    <>
      {sections.map((n) => (
        <React.Fragment key={n}>
          <InvestorSection page={page} n={n} />

          {/* ✅ After section 4 -> section9 */}
          {n === 4 && (page.section9_title || page.section9_description) ? (
            <div className="contentpart">
              {page.section9_title ? <h3>{page.section9_title}</h3> : null}
              <Html html={page.section9_description} />
            </div>
          ) : null}

          {/* ✅ After section 6 -> section10 */}
          {n === 6 && (page.section10_title || page.section10_description) ? (
            <div className="contentpart">
              {page.section10_title ? <h3>{page.section10_title}</h3> : null}
              <Html html={page.section10_description} />
            </div>
          ) : null}

          {/* ✅ After section 7 -> section11 */}
          {n === 7 && (page.section11_title || page.section11_description) ? (
            <div className="contentpart">
              {page.section11_title ? <h3>{page.section11_title}</h3> : null}
              <Html html={page.section11_description} />
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
}
