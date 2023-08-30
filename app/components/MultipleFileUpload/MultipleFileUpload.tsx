"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import "./MultipleFileUpload.scss";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { PostCreateFieldData, PreviewFileUploadProps } from "@/MOCK_DATA";

type MultiFileUploadProps = {
  setPreviewURLs: (data: PreviewFileUploadProps[]) => void;
  previewURLs: PreviewFileUploadProps[];
  selectedFiles: File[] | null;
  setSelectedFiles: any;
  singleData: PostCreateFieldData;
  handleDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  DynamicFieldData: any;
};
const MultiFileUpload: React.FC<MultiFileUploadProps> = ({
  setPreviewURLs,
  previewURLs,
  setSelectedFiles,
  selectedFiles,
  handleDropHandler,
  handleFileChange,
  singleData,
  DynamicFieldData,
}: MultiFileUploadProps) => {
  const { fieldName: name, pattern } = singleData;

  return (
    <div
      className="file-upload"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDropHandler}
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
        {previewURLs?.map((url, index) => (
          <div key={index} className="preview-item">
            <IconButton
              sx={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {
                // setPreviewURLs((prev: PreviewFileUploadProps[]) => {
                //   return prev.filter((dta) => dta.url !== url.url);
                // });
                const ArrUrls = previewURLs.filter(
                  (data) => data.name !== url.name
                );
                console.log(ArrUrls);
                setPreviewURLs(ArrUrls);
                console.log(selectedFiles);
                const updatedObj = selectedFiles?.filter(
                  (data) => data.name !== url.name
                );
                console.log(updatedObj);
                console.log(DynamicFieldData);
                console.log(name);

                setSelectedFiles((prev: any) => {
                  return { ...prev, [name]: updatedObj };
                });
              }}
            >
              <CloseIcon sx={{ color: "blue", fontSize: "10px" }} />
            </IconButton>
            {url.type.startsWith("image/") ? (
              <Image
                src={url.url}
                alt={`Preview ${index}`}
                height={100}
                width={90}
              />
            ) : (
              ""
            )}
            {url.type === "application/pdf" ? (
              <Image
                src={"/Images/pdf-icon.webp"}
                alt={`Preview ${index}`}
                height={100}
                width={90}
              />
            ) : (
              ""
            )}
            {url.type === "text/plain" ? (
              <Image
                src={"/Images/textFileImage.png"}
                alt={`Preview ${index}`}
                height={100}
                width={100}
              />
            ) : (
              ""
            )}
            {url.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
              <Image
                src={"/Images/excelImage.jfif"}
                alt={`Preview ${index}`}
                height={100}
                width={100}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiFileUpload;
