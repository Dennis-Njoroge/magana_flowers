import React from "react";
import Lottie from "react-lottie";
import animationData from "@/lottie/login-lottie.json"

const LoginLottie = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        isClickToPauseDisabled={true}
    />;
}

export default LoginLottie;