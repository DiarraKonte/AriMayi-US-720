import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import JobCandidacyCard from "../Cards/JobCandidacyCards";
import { Job } from "../../Slice/jobs/jobInterfaces";

const CandidacyCarousel = ({ items = [] }: { items: Job[] }) => {
  const [index, setIndex] = useState(0); // Current index of the carousel
  const [visibleCount, setVisibleCount] = useState(3); // Number of visible cards at a time
  const cardGap = 15; // Gap between cards
  const defaultCardWidth = 320; // Default width of each card

  // Responsive adjustment of visible cards based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setVisibleCount(1); // Show 1 card on small screens
      } else if (width < 1024) {
        setVisibleCount(2); // Show 2 cards on medium screens
      } else {
        setVisibleCount(3); // Show 3 cards on large screens
      }
    };

    updateVisibleCount(); // Initial call to set the visible count
    window.addEventListener("resize", updateVisibleCount); // Update on window resize
    return () => window.removeEventListener("resize", updateVisibleCount); // Cleanup listener on unmount
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount); // Maximum index to prevent overflow
  const cardWidth = defaultCardWidth; // Card width

  // Function to move to the previous set of cards
  const prev = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0)); // Decrease index, but don't go below 0
  }, []);

  // Function to move to the next set of cards
  const next = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, maxIndex)); // Increase index, but don't exceed maxIndex
  }, [maxIndex]);

  // Function to navigate to a specific page of the carousel
  const goToPage = useCallback(
    (page: number) => {
      const targetIndex = page * visibleCount; // Calculate target index based on page number
      setIndex(Math.min(targetIndex, maxIndex)); // Set index, ensuring it doesn't exceed maxIndex
    },
    [maxIndex, visibleCount],
  );

  const carouselRef = useRef<HTMLDivElement>(null); // Ref for the carousel container

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          width: `calc(${visibleCount} * ${cardWidth}px + ${(visibleCount - 1) * cardGap}px)`, // Dynamic width based on visible cards and gap
          position: "relative",
        }}
      >
        {/* Previous button - only shown if not at the start */}
        {index > 0 && (
          <Button
            shape="circle"
            icon={<LeftOutlined style={{ color: "#FB923C" }} />}
            onClick={prev}
            size="large"
            style={{ position: "absolute", left: "-50px", zIndex: 1 }}
            data-testid="prev-button"
            aria-label="Previous"
          />
        )}

        {/* Carousel container */}
        <div
          data-testid="carousel-container"
          style={{
            width: `calc(${visibleCount} * ${cardWidth}px + ${(visibleCount - 1) * cardGap}px)`, // Matches container width
            overflow: "hidden", // Hide overflow to create the carousel effect
            position: "relative",
          }}
        >
          {/* Inner carousel content */}
          <div
            data-testid="carousel-inner"
            style={{
              display: "flex",
              gap: `${cardGap}px`,
              transform: `translateX(-${index * (cardWidth + cardGap)}px)`, // Moves cards horizontally based on index
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth sliding animation
            }}
          >
            {/* Map through items to render cards */}
            {items.map((job, idx) => (
              <div
                key={job.id}
                style={{
                  flex: `0 0 ${cardWidth}px`, // Fixed width for each card
                  opacity: idx >= index && idx < index + visibleCount ? 1 : 0.5, // Adjust opacity for visibility
                  transition: "opacity 0.5s ease-in-out", // Smooth opacity transition
                }}
              >
                <JobCandidacyCard job={job}  onClick={() => {}} />
              </div>
            ))}
          </div>
        </div>

        {/* Next button - only shown if not at the end */}
        {index < maxIndex && (
          <Button
            shape="circle"
            icon={<RightOutlined style={{ color: "#FB923C" }} />}
            onClick={next}
            size="large"
            style={{ position: "absolute", right: "-50px", zIndex: 1 }}
            data-testid="next-button"
            aria-label="Next"
          />
        )}
      </div>

      {/* Pagination dots - only shown if there are more items than visible cards */}
      {items.length > visibleCount && (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          {Array.from({ length: Math.ceil(items.length / visibleCount) }).map(
            (_, page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background:
                    Math.floor(index / visibleCount) === page
                      ? "#f28c68"
                      : "#d3d3d3", // Highlight active page
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s ease-in-out", // Smooth background transition
                }}
                aria-label={`Page ${page + 1}`}
                data-testid={`pagination-dot-${page}`}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default CandidacyCarousel;
