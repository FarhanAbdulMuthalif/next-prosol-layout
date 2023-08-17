"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import "./MultipleFileUpload.scss";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
const MultiFileUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log(event.target.files);
      console.table(event.target.files);

      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
      console.log(filesArray);
      // Create an array of preview URLs using FileReader
      const previewURLsArray = filesArray.map((file) => {
        console.log(URL.createObjectURL(file));
        return URL.createObjectURL(file);
      });
      console.log(previewURLsArray);
      setPreviewURLs(previewURLsArray);
    }
  };

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      console.log(event.dataTransfer.files);
      console.table(event.dataTransfer.files);
      console.log(event.dataTransfer.files[0]);
      console.table(event.dataTransfer.files[0]);
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);

      // Create an array of preview URLs using FileReader
      const previewURLsArray = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewURLs(previewURLsArray);
    }
  }, []);

  return (
    <div
      className="file-upload"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label htmlFor="file-input" className="upload-label">
        {previewURLs.length > 0
          ? `${previewURLs.length} files selected`
          : "Choose Multiple files or drag here"}
        {previewURLs.length === 0 ? <UploadIcon /> : ""}
      </label>
      <input
        accept="image/*"
        id="file-input"
        type="file"
        onChange={handleFileChange}
        multiple
      />
      <div className="preview-container">
        {previewURLs.map((url, index) => (
          <div key={index} className="preview-item">
            <IconButton
              sx={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {
                setPreviewURLs((prev: string[]) => {
                  return prev.filter((dta) => dta !== url);
                });
              }}
            >
              <CloseIcon sx={{ color: "blue", fontSize: "10px" }} />
            </IconButton>

            <Image
              src={url}
              alt={`Preview ${index}`}
              height={100}
              width={100}
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiFileUpload;
