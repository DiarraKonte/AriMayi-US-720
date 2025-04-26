import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button, theme } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import JobInterviewCard from "../Cards/JobInterviewCard";

// Defines the InterviewCarousel component, which takes an optional array of items as a prop
const InterviewCarousel = ({ items = [] }: { items?: any[] }) => {

  // State to track the current index of the carousel
  const [index, setIndex] = useState(0);
  // State to dynamically set the number of visible cards based on screen size
  const [visibleCount, setVisibleCount] = useState(3);
  const cardWidth = 320; 
  const cardGap = 15;

  // useEffect hook to handle responsive design by updating visibleCount based on window size
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth; // Gets the current window width
      if (width < 600) {
        setVisibleCount(1); // Shows 1 card for small screens (e.g., mobile)
      } else if (width < 1024) {
        setVisibleCount(2); // Shows 2 cards for medium screens (e.g., tablet)
      } else {
        setVisibleCount(3); // Shows 3 cards for large screens (e.g., desktop)
      }
    };

    updateVisibleCount(); // Initial call to set visibleCount
    window.addEventListener("resize", updateVisibleCount); // Adds event listener for window resize
    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []); // Empty dependency array means this effect runs only once on mount

  // Calculates the maximum index to prevent scrolling beyond available items
  const maxIndex = Math.max(0, items.length - visibleCount);

  // Ref to access the carousel container DOM element
  const carouselRef = useRef<HTMLDivElement>(null);

  // Callback to navigate to the previous set of cards
  const prev = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0)); // Ensures index doesn't go below 0
  }, []);

  // Callback to navigate to the next set of cards
  const next = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, maxIndex)); // Ensures index doesn't exceed maxIndex
  }, [maxIndex]); // Depends on maxIndex

  // Callback to jump to a specific page in the carousel
  const goToPage = useCallback(
    (page: number) => {
      const targetIndex = page * visibleCount; // Calculates the starting index for the page
      setIndex(Math.min(targetIndex, maxIndex)); // Sets index, ensuring it doesn't exceed maxIndex
    },
    [maxIndex, visibleCount], // Depends on maxIndex and visibleCount
  );

  // If no items are provided or the array is empty, render nothing
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={carouselRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px", 
      }}
    >
      {/* Container for the carousel cards and navigation buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px", // Horizontal gap between elements
          width: `calc(${visibleCount} * ${cardWidth}px + ${(visibleCount - 1) * cardGap}px)`, // Dynamic width based on visible cards and gaps
          position: "relative", // Allows absolute positioning of navigation buttons
        }}
      >
        {/* Left navigation button, shown only if index > 0 */}
        {index > 0 && (
          <Button
            shape="circle"
            icon={<LeftOutlined style={{ color: "#FB923C" }} />} // Orange arrow icon
            onClick={prev} // Calls prev function on click
            size="large"
            style={{ position: "absolute", left: "-50px", zIndex: 1 }} // Positions button to the left
          />
        )}

        {/* Container for the sliding cards */}
        <div
          style={{
            width: `calc(${visibleCount} * ${cardWidth}px + ${(visibleCount - 1) * cardGap}px)`, // Matches the parent container width
            overflow: "hidden", 
            position: "relative",
          }}
        >
          {/* Inner container that slides to show different cards */}
          <div
            style={{
              display: "flex",
              gap: `${cardGap}px`, // Gap between cards
              transform: `translateX(-${index * (cardWidth + cardGap)}px)`, // Slides cards left based on index
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth sliding animation
            }}
          >
            {/* Maps over items to render JobInterviewCard components */}
            {items.map((job, idx) => (
              <div
                key={job.id} // Unique key for each card
                style={{
                  flex: `0 0 ${cardWidth}px`, // Fixed width for each card, no shrinking or growing
                  opacity: idx >= index && idx < index + visibleCount ? 1 : 0.5, // Fades out non-visible cards
                  transition: "opacity 0.5s ease-in-out", // Smooth opacity transitio
                }}
              >
                <JobInterviewCard job={job} onClick={() => {}} /> {/* Renders a card with job data */}
              </div>
            ))}
          </div>
        </div>

        {/* Right navigation button, shown only if index < maxIndex */}
        {index < maxIndex && (
          <Button
            shape="circle"
            icon={<RightOutlined style={{ color: "#FB923C" }} />} // Orange arrow icon
            onClick={next} // Calls next function on click
            size="large"
            style={{ position: "absolute", right: "-50px", zIndex: 1 }} // Positions button to the right
          />
        )}
      </div>

      {/* Pagination dots, shown only if there are more items than visibleCount */}
      {items.length > visibleCount && (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          {/* Creates an array of pagination dots based on the number of pages */}
          {Array.from({ length: Math.ceil(items.length / visibleCount) }).map(
            (_, page) => (
              <button
                key={page} // Unique key for each dot
                onClick={() => goToPage(page)} // Navigates to the corresponding page
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background:
                    Math.floor(index / visibleCount) === page
                      ? "#f28c68" // Orange for active page
                      : "#d3d3d3", // Gray for inactive pages
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s ease-in-out", 
                }}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewCarousel; 