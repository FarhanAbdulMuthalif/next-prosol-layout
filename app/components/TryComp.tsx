/* import { useEffect, useRef } from "react";

function DynamicIframeComponent() {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Handle iframe load event
    const handleLoad = () => {
      console.log("Iframe loaded");
    };

    // Add event listener for iframe load event
    iframeRef?.current.addEventListener("load", handleLoad);

    // Clean up event listener on component unmount
    return () => {
      iframeRef?.current.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="https://www.youtube.com/embed/YHfPOKx_wU0"
      title="Embedded YouTube Video"
      width="560"
      height="315"
      frameBorder="0"
      allowFullScreen
    />
  );
}

export default DynamicIframeComponent;
 */
"use client";
import React, { useState } from "react";
import axios from "axios";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    console.log(" event.target.files && event.target.files[0] below");
    console.log(event.target.files && event.target.files[0]);
    console.log(" event.target.files[0] below");
    console.log(event.target.files[0]);
    console.log(" event.target.files below");
    console.log(event.target.files);
    if (selectedFile) {
      console.log("selected file below");
      console.log(selectedFile);
      console.table(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload File</button>
    </form>
  );
};

export default UploadForm;
