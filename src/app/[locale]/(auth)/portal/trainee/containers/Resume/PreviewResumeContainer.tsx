"use client";
// Import necessary hooks and components
import { useState, useEffect } from "react";
import PreviewResume from "../../components/resume/previewResume"; // Import the PreviewResume component
import { Spin } from "antd"; // Import the Spin component from Ant Design for loading spinner

export default function PreviewResumeContainer() {
  // State to manage the loading status
  const [loading, setLoading] = useState(true);

  // useEffect hook to simulate loading (e.g., waiting for an API call or data)
  useEffect(() => {
    // Simulate a loading delay of 1 second (could be replaced with an actual API call)
    const timer = setTimeout(() => {
      setLoading(false); // Disable the loading spinner after 1 second
    }, 1000);

    // Clean up the timer if the component unmounts before the timeout completes
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect will run only once when the component mounts

  // While data is being loaded (loading = true), show a spinner
  if (loading) {
    return (
      <div
        style={{
          display: "flex", // Center spinner horizontally
          justifyContent: "center", // Center spinner horizontally
          alignItems: "center", // Center spinner vertically
          height: "100vh", // Take up the full viewport height for centering
        }}
      >
        <Spin size="large" /> {/* Large loading spinner */}
      </div>
    );
  }

  // Once loading is complete (loading = false), render the PreviewResume component
  return (
    <main
      style={{
        height: "100vh", // Take up the full height of the viewport
        paddingTop: 5, // Some top padding
        background: "white", // White background for the page
      }}
    >
      <PreviewResume /> {/* Render the PreviewResume component */}
    </main>
  );
}
