"use client";
// components/SingleFileUpload.tsx
import React, { useCallback, useState } from "react";
import Image from "next/image";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import "./SingleFileUpload.scss";
import { PostCreateFieldData } from "@/MOCK_DATA";
type SingleFileUploadProps = {
  selectedFile: File | null;
  handleDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewURL: any;
  setPreviewURL: (data: any) => void;
  setSelectedFile: any;
  singleData: PostCreateFieldData;
  DynamicFieldData: any;
};
const SingleFileUpload: React.FC<SingleFileUploadProps> = ({
  selectedFile,
  handleDropHandler,
  handleFileChange,
  previewURL,
  setSelectedFile,
  setPreviewURL,
  singleData,
  DynamicFieldData,
}: SingleFileUploadProps) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [previewURL, setPreviewURL] = useState<string | null>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files && event.target.files[0];
  //   if (file) {
  //     console.log(event.target.files);
  //     console.table(event.target.files);
  //     //   console.log(event.target.files[0]);
  //     //   console.table(event.target.files[0]);
  //     setSelectedFile(file);
  //     setPreviewURL(URL.createObjectURL(file));
  //   }
  // };

  // const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();

  //   const file = event.dataTransfer.files && event.dataTransfer.files[0];
  //   if (file) {
  //     console.log(event.dataTransfer.files);
  //     console.table(event.dataTransfer.files);
  //     console.log(event.dataTransfer.files[0]);
  //     console.table(event.dataTransfer.files[0]);
  //     setSelectedFile(file);
  //     setPreviewURL(URL.createObjectURL(file));
  //   }
  // }, []);
  const { fieldName: name, pattern } = singleData;
  return (
    <div
      className="file-upload"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDropHandler}
    >
      <label htmlFor={`${name}FileUploadSingleId`} className="upload-label">
        {selectedFile
          ? selectedFile.name
          : `Choose only ${pattern?.includes("image/*") ? "Image ," : ""} ${
              pattern?.includes("application/pdf") ? "PDF ," : ""
            } ${
              pattern?.includes(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              )
                ? "Excel "
                : ""
            } file or drag it here`}
        {selectedFile ? "" : <UploadIcon />}
      </label>
      <input
        className="Sin-file-input"
        type="file"
        onChange={handleFileChange}
        id={`${name}FileUploadSingleId`}
        accept={pattern?.toString()}
      />

      {selectedFile && (
        <div className="preview-container">
          <IconButton
            sx={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => {
              // setPreviewURL(null);
              const updateUrl = { ...previewURL };
              delete updateUrl[name];
              setPreviewURL(updateUrl);
              const updatedObject = { ...DynamicFieldData };
              delete updatedObject[name];
              setSelectedFile(updatedObject);
            }}
          >
            <CloseIcon sx={{ color: "blue", fontSize: "10px" }} />
          </IconButton>
          {selectedFile.type === "application/pdf" ? (
            <Image
              className="sinImg"
              src={"/Images/pdf-icon.svg"}
              alt="Preview"
              height={100}
              width={100}
            />
          ) : selectedFile.type.startsWith("image/") ? (
            <Image
              className="sinImg"
              src={previewURL ? (previewURL[name] as string) : ""}
              alt="Preview"
              height={100}
              width={100}
            />
          ) : selectedFile.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
            <Image
              className="sinImg"
              src={"/Images/excelImage.svg"}
              alt="Preview"
              height={100}
              width={100}
            />
          ) : selectedFile.type === "text/csv" ? (
            <Image
              className="sinImg"
              src={"/Images/csvImage.svg"}
              alt="Preview"
              height={100}
              width={100}
            />
          ) : selectedFile.type === "text/plain" ? (
            <Image
              src={"/Images/textFileImage.svg"}
              alt={`Preview`}
              height={100}
              width={100}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default SingleFileUpload;
