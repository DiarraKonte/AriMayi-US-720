import { useCallback, useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useI18n } from "../../../../../../../../locales/client";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../Slice/jobs/jobThunks";
import JobFavoriteCard from "../Cards/JobFavoriteCard";
import { Job } from "../../Slice/jobs/jobInterfaces";
import { RootState } from "@/lib/store";
import { AppDispatch } from "@/lib/store";

// Props for the Carousel component, which expects an array of Job items
interface CarouselProps {
  items: Job[];
}

// Carousel component to display favorite job cards
const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [index, setIndex] = useState(0); // Current index of the carousel
  const [visibleCount, setVisibleCount] = useState(3); // Number of visible cards
  const cardWidth = 320; // Width of each card
  const cardGap = 15; // Gap between cards

  // Dynamically adjusts visible cards based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount); // Maximum index for the carousel

  // Function to go to the next set of cards
  const next = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  // Function to go to the previous set of cards
  const prev = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Function to go to a specific page of cards
  const goToPage = useCallback(
    (page: number) => {
      const targetIndex = page * visibleCount;
      setIndex(Math.min(targetIndex, maxIndex));
    },
    [maxIndex, visibleCount],
  );

  const carouselRef = useRef<HTMLDivElement>(null); // Reference to the carousel container

  // If there are no items, return null
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          width: `calc(${visibleCount} * ${cardWidth}px + ${(visibleCount - 1) * cardGap}px)`,
          position: "relative",
        }}
      >
        {index > 0 && (
          <Button
            shape="circle"
            icon={<LeftOutlined style={{ color: "#FB923C" }} />}
            onClick={prev}
            size="large"
            style={{ position: "absolute", left: "-50px", zIndex: 1 }}
          />
        )}

        <div
          style={{
            width: `calc(${visibleCount} * ${cardWidth}px + ${(visibleCount - 1) * cardGap}px)`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: `${cardGap}px`,
              transform: `translateX(-${index * (cardWidth + cardGap)}px)`, // Slides cards based on current index
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {items.map((job, idx) => (
              <div key={job.id || idx} style={{ flex: `0 0 ${cardWidth}px` }}>
                <JobFavoriteCard job={job} />
              </div>
            ))}
          </div>
        </div>

        {index < maxIndex && (
          <Button
            shape="circle"
            icon={<RightOutlined style={{ color: "#FB923C" }} />}
            onClick={next}
            size="large"
            style={{ position: "absolute", right: "-50px", zIndex: 1 }}
          />
        )}
      </div>

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
                      : "#d3d3d3",
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

// Main component to display favorite jobs in a carousel
const FavoriteCarousel = () => {
  const t = useI18n(); // Translation hook for managing multilingual texts
  const dispatch = useDispatch<AppDispatch>(); // Dispatch hook to send Redux actions
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs,
  ); // Fetches jobs state from Redux

  // Fetches jobs on component mount
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Filters jobs to show only favorites
  const favoriteJobs = jobs.filter((job) => job.favorite);

  // If loading, display a loading message
  if (loading) {
    return <div>{t("TraineeJob.FavoriteLoading")}</div>;
  }

  // If there is an error, display an error message
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  // If there are no favorite jobs, display a message
  if (!favoriteJobs || favoriteJobs.length === 0) {
    return <div>{t("TraineeJob.NoJobFavoriteFound")}</div>;
  }

  // Render the carousel with favorite jobs
  return (
    <div>
      <Carousel items={favoriteJobs} />
    </div>
  );
};

export default FavoriteCarousel;