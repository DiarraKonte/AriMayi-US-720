"use client";
// Importing necessary React hooks and Ant Design components
import { useEffect, useState } from "react";
import { Spin } from "antd"; // Spinner component from Ant Design
import TraineeModifyResume from "../../components/resume/modify-resume"; // Custom component to modify the resume

export default function ModifyResume() {
  // State to manage the loading status
  const [loading, setLoading] = useState(true);

  // useEffect hook to simulate loading (for example, waiting for an API call)
  useEffect(() => {
    // Simulating a loading delay (1 second in this case)
    const timer = setTimeout(() => {
      setLoading(false); // Disable the loading spinner after 1 second
    }, 1000);

    // Clean up the timer when the component is unmounted or when the effect is cleaned up
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

  // Display a loading spinner while the data is being fetched or loaded
  if (loading) {
    return (
      <div
        style={{
          display: "flex", // Center the spinner horizontally
          justifyContent: "center", // Center the spinner horizontally
          alignItems: "center", // Center the spinner vertically
          height: "100vh", // Full viewport height for centering
        }}
      >
        <Spin size="large" /> {/* Large loading spinner */}
      </div>
    );
  }

  // Once loading is complete, render the TraineeModifyResume component
  return <TraineeModifyResume />;
}
