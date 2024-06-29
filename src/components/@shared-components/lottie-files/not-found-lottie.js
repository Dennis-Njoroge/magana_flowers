import React, {useEffect, useState} from "react";
import Lottie from "react-lottie";
import animationData from "@/lottie/404-lottie.json"

const NotFoundLottie = props => {
    const { isLoading = true } = props;
    const [defaultOptions, setDefaultOptions] = useState({
        loop: true,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    });

    useEffect(() => {
        setDefaultOptions({
            ...defaultOptions,
            autoplay: isLoading,
        })
    },[isLoading])

    return <Lottie
        options={defaultOptions}
        height={300}
        //speed={5}
        isStopped={!isLoading}
        width={300}
        isClickToPauseDisabled={true}
    />;
}

export default NotFoundLottie;