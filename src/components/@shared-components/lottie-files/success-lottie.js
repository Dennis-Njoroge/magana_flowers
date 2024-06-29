import React from "react";
import Lottie from "react-lottie";
import animationData from "@/lottie/success-lottie.json"

const SuccessLottie = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return <Lottie
        options={defaultOptions}
        height={150}
        width={150}
        speed={0.8}
        isClickToPauseDisabled={true}
    />;
}

export default SuccessLottie;