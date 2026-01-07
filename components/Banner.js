'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../public/css/Banner.css';

const Banner = () => {
  const router = useRouter();

  // Banner Slider
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dropdown Data (used in both forms)
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  // ---------------------------
  // For Sale form states
  // ---------------------------
  const [type, setType] = useState('');
  const [locationId, setLocationId] = useState('');
  const [landSize, setLandSize] = useState('');        // now dynamic
  const [budget, setBudget] = useState('');            // now dynamic

  // ✅ For Sale API lists
  const [saleBudgets, setSaleBudgets] = useState([]);  // [{min,max}, ...]
  const [landSizes, setLandSizes] = useState([]);      // [76576, 76777, ...]

  // ---------------------------
  // For Rent budgets (API)
  // ---------------------------
  const [rentBudgets, setRentBudgets] = useState([]);
  const [rentBudget, setRentBudget] = useState(''); // "17500-18500"

  // ---------------------------
  // For Rent form states (query params)
  // ---------------------------
  const [rentType, setRentType] = useState('');
  const [checkin, setCheckin] = useState('2025-09-15');
  const [checkout, setCheckout] = useState(''); // empty => URL me "&checkout"
  const [rentGuests, setRentGuests] = useState('6');

  // ------------------------------------------------------------------
  // FETCH PROPERTY TYPES
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get(
          'https://techzenondev.com/apnatai/api/property-types?page=1'
        );

        const types = res?.data?.data?.data;

        if (Array.isArray(types)) {
          setPropertyTypes(types);

          // defaults
          if (types.length > 0) {
            setType(types[0].id.toString());
            setRentType(types[0].id.toString());
          }
        }
      } catch (err) {
        console.error('Error fetching property types:', err);
      }
    };

    fetchTypes();
  }, []);

  // ------------------------------------------------------------------
  // FETCH LOCATIONS
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(
          'https://techzenondev.com/apnatai/api/locations?page=1'
        );

        const locs = res?.data?.data?.data;

        if (Array.isArray(locs)) {
          setLocations(locs);
          if (locs.length > 0) setLocationId(locs[0].id.toString());
        }
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
    };

    fetchLocations();
  }, []);

  // ------------------------------------------------------------------
  // FETCH BANNERS
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          'https://techzenondev.com/apnatai/api/active-banners'
        );
        if (response.data.success && response.data.data.length > 0) {
          setBanners(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    fetchBanners();
  }, []);

  // ------------------------------------------------------------------
  // FETCH RENT BUDGETS (For Rent)
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchRentBudgets = async () => {
      try {
        const res = await axios.get(
          'https://techzenondev.com/apnatai/api/for-rent-budget/1/edit'
        );

        const budgetsArr = res?.data?.data?.budgets;

        if (Array.isArray(budgetsArr)) {
          setRentBudgets(budgetsArr);

          if (budgetsArr.length > 0) {
            setRentBudget(`${budgetsArr[0].min}-${budgetsArr[0].max}`);
          }
        } else {
          setRentBudgets([]);
          setRentBudget('');
        }
      } catch (err) {
        console.error('Error fetching rent budgets:', err);
        setRentBudgets([]);
        setRentBudget('');
      }
    };

    fetchRentBudgets();
  }, []);

  // ------------------------------------------------------------------
  // ✅ FETCH SALE BUDGETS (For Sale)
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchSaleBudgets = async () => {
      try {
        const res = await axios.get(
          'https://techzenondev.com/apnatai/api/for-sale-budget/1/edit'
        );

        const budgetsArr = res?.data?.data?.budgets;

        if (Array.isArray(budgetsArr)) {
          setSaleBudgets(budgetsArr);

          // default select first
          if (budgetsArr.length > 0) {
            setBudget(`${budgetsArr[0].min}-${budgetsArr[0].max}`);
          }
        } else {
          setSaleBudgets([]);
          setBudget('');
        }
      } catch (err) {
        console.error('Error fetching sale budgets:', err);
        setSaleBudgets([]);
        setBudget('');
      }
    };

    fetchSaleBudgets();
  }, []);

  // ------------------------------------------------------------------
  // ✅ FETCH LAND SIZES (For Sale)
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchLandSizes = async () => {
      try {
        const res = await axios.get(
          'https://techzenondev.com/apnatai/api/land-size/1/edit'
        );

        const sizesArr = res?.data?.data?.sizes; // you shared: data.sizes [web:71]

        if (Array.isArray(sizesArr)) {
          setLandSizes(sizesArr);

          // default select first
          if (sizesArr.length > 0) {
            setLandSize(String(sizesArr[0]));
          }
        } else {
          setLandSizes([]);
          setLandSize('');
        }
      } catch (err) {
        console.error('Error fetching land sizes:', err);
        setLandSizes([]);
        setLandSize('');
      }
    };

    fetchLandSizes();
  }, []);

  // Auto slide
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  // Split title
  const splitTitle = (title) => {
    if (!title)
      return {
        small: 'Welcome to ap-natai',
        large: 'Natai Concierge At Your Service',
      };
    const parts = title.split(' ');
    if (parts.length > 3) {
      return {
        small: parts.slice(0, 4).join(' '),
        large: parts.slice(4).join(' '),
      };
    }
    return { small: title, large: '' };
  };

  const currentBanner = banners[currentIndex] || {};
  const { small, large } = splitTitle(currentBanner.title);

  // ------------------------------------------------------------------
  // HANDLE RENT SEARCH -> exact query format
  // ------------------------------------------------------------------
  const handleRentSearch = (e) => {
    e.preventDefault();

    const qs =
      `type=${encodeURIComponent(rentType)}` +
      `&checkin=${encodeURIComponent(checkin)}` +
      (checkout ? `&checkout=${encodeURIComponent(checkout)}` : `&checkout`) +
      `&guests=${encodeURIComponent(rentGuests)}` +
      `&budget=${encodeURIComponent(rentBudget)}`;

    router.push(`/search-for-real-estate?${qs}`);
  };

  // ------------------------------------------------------------------
  // HANDLE FOR SALE SEARCH
  // ------------------------------------------------------------------
  const handleRealEstateSearch = (e) => {
    e.preventDefault();

    router.push(
      `/search-for-real-estate?type=${encodeURIComponent(
        type
      )}&location=${encodeURIComponent(
        locationId
      )}&landsize=${encodeURIComponent(
        landSize
      )}&budget=${encodeURIComponent(budget)}`
    );
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${currentBanner.image || '/default-banner.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
      }}
    >
      <div className="overlay"></div>

      <div className="banner-content">
        {/* LEFT FORM (For Rent) */}
        <div className="form-box">
          <div className="form-title form-title-one">
            <p>For Rent</p>
          </div>

          <form onSubmit={handleRentSearch}>
            <label>Property Type</label>
            <select value={rentType} onChange={(e) => setRentType(e.target.value)}>
              {propertyTypes.length > 0 ? (
                propertyTypes.map((pt) => (
                  <option key={pt.id} value={pt.id}>
                    {pt.name}
                  </option>
                ))
              ) : (
                <option value="">Loading...</option>
              )}
            </select>

            <div className="date-row">
              <div className="date-field">
                <label>Check-in Date</label>
                <input
                  type="date"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                />
              </div>

              <div className="date-field">
                <label>Check-out Date</label>
                <input
                  type="date"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </div>
            </div>

            <label>Number Of Guests</label>
            <select
              value={rentGuests}
              onChange={(e) => setRentGuests(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>

            <label>Budget</label>
            <select value={rentBudget} onChange={(e) => setRentBudget(e.target.value)}>
              {rentBudgets.length > 0 ? (
                rentBudgets.map((b, idx) => {
                  const val = `${b.min}-${b.max}`;
                  const minLabel = Number.isFinite(Number(b.min))
                    ? Number(b.min).toLocaleString()
                    : b.min;
                  const maxLabel = Number.isFinite(Number(b.max))
                    ? Number(b.max).toLocaleString()
                    : b.max;

                  return (
                    <option key={idx} value={val}>
                      ฿{minLabel} - ฿{maxLabel}
                    </option>
                  );
                })
              ) : (
                <option value="">Loading...</option>
              )}
            </select>

            <button type="submit">Search</button>
          </form>
        </div>

        {/* CENTER TEXT */}
        <div className="center-text banner-center-text fade-in">
          <h2>{small}</h2>
          <h1>{large}</h1>

          {currentBanner?.button_link || currentBanner?.button_text ? (
            <a
              href={currentBanner.button_link || currentBanner.button_text}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="learn-more">
                {currentBanner?.button_text ? 'Learn More' : 'Explore'}
              </button>
            </a>
          ) : (
            <button className="learn-more">Learn More</button>
          )}
        </div>

        {/* RIGHT FORM (For Sale) */}
        <div className="form-box">
          <div className="form-title form-title-two">
            <p>For Sale</p>
          </div>

          <form onSubmit={handleRealEstateSearch}>
            <label>Property Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {propertyTypes.length > 0 ? (
                propertyTypes.map((pt) => (
                  <option key={pt.id} value={pt.id}>
                    {pt.name}
                  </option>
                ))
              ) : (
                <option value="">Loading...</option>
              )}
            </select>

            <label>Location</label>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
              {locations.length > 0 ? (
                locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))
              ) : (
                <option value="">Loading...</option>
              )}
            </select>

            <label>Land Size</label>
            <select value={landSize} onChange={(e) => setLandSize(e.target.value)}>
              {landSizes.length > 0 ? (
                landSizes.map((s, idx) => (
                  <option key={idx} value={String(s)}>
                    {s} M² Area
                  </option>
                ))
              ) : (
                <option value="">Loading...</option>
              )}
            </select>

            <label>Budget</label>
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              {saleBudgets.length > 0 ? (
                saleBudgets.map((b, idx) => {
                  const val = `${b.min}-${b.max}`;
                  const minLabel = Number.isFinite(Number(b.min))
                    ? Number(b.min).toLocaleString()
                    : b.min;
                  const maxLabel = Number.isFinite(Number(b.max))
                    ? Number(b.max).toLocaleString()
                    : b.max;

                  return (
                    <option key={idx} value={val}>
                      ฿{minLabel} - ฿{maxLabel}
                    </option>
                  );
                })
              ) : (
                <option value="">Loading...</option>
              )}
            </select>

            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;