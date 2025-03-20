import React from "react";
import { PdfProps } from "../types";

const ImageViewer = (props: PdfProps) => {
    const { src } = props;
    const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the context menu
  };

  return (
    <div>
      <img
        src={src} // Image file path in public folder
        alt="Your Image"
        style={{ width: "100%", maxWidth: "600px", display: "block" }}
        onContextMenu={handleRightClick} // Disable right-click
        draggable={false} // Disable dragging
      />
    </div>
  );
};

export default ImageViewer;
