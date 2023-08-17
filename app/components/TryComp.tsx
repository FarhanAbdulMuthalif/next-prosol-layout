// import React, { useCallback, useState } from "react";
// import UploadIcon from "@mui/icons-material/Upload";
// import CloseIcon from "@mui/icons-material/Close";
// import { IconButton } from "@mui/material";
// import "./CompressFileUpload.scss";

// const CompressFileUpload: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewURL, setPreviewURL] = useState<string | null>(null);

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files && event.target.files[0];
//     if (file) {
//       const resizedImage = await resizeImage(file);
//       setSelectedFile(resizedImage);
//       console.log(resizedImage);
//       setPreviewURL(URL.createObjectURL(resizedImage));
//     }
//   };

//   const resizeImage = (file: File): Promise<File> => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const img = new Image();
//         img.src = event.target.result as string;

//         img.onload = () => {
//           const MAX_WIDTH = 800; // Set the maximum width you want for the image
//           const scale = MAX_WIDTH / img.width;
//           const height = img.height * scale;

//           const canvas = document.createElement("canvas");
//           canvas.width = MAX_WIDTH;
//           canvas.height = height;

//           const ctx = canvas.getContext("2d");
//           ctx?.drawImage(img, 0, 0, MAX_WIDTH, height);

//           canvas.toBlob(
//             (blob) => {
//               const resizedFile = new File([blob as Blob], file.name, {
//                 type: "image/jpeg", // Change the type if needed
//               });
//               resolve(resizedFile);
//             },
//             "image/jpeg",
//             0.7
//           ); // Adjust the compression quality as needed
//         };
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <div className="file-upload">
//       <label htmlFor="file-input" className="upload-label">
//         {selectedFile ? selectedFile.name : "Choose a file"}
//         {selectedFile ? "" : <UploadIcon />}
//       </label>
//       <input
//         id="file-input"
//         type="file"
//         onChange={handleFileChange}
//         style={{ display: "none" }}
//       />

//       {selectedFile && (
//         <div className="preview-container">
//           <IconButton
//             sx={{
//               position: "absolute",
//               top: "-10px",
//               right: "-10px",
//               boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//               zIndex: 999,
//             }}
//             onClick={() => {
//               setPreviewURL(null);
//               setSelectedFile(null);
//             }}
//           >
//             <CloseIcon sx={{ color: "blue", fontSize: "10px" }} />
//           </IconButton>
//           <img
//             src={previewURL as string}
//             alt="Preview"
//             style={{ height: 100, width: 100, objectFit: "cover" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompressFileUpload;
