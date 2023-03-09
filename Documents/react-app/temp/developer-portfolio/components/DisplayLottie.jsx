import React from "react";
import Lottie from "react-lottie";

const GreetingLottie = ({ animationPath, height, width }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    path: animationPath,
  };

  return (
    <div
      onClick={() => null}
      style={{ height: height || "none", width: width || "none" }}
    >
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default GreetingLottie;
