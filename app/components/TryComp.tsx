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
