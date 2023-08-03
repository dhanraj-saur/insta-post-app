
import React, { useState, useEffect } from "react";

import bgImgArray from "../assest/Image";


const Image = () => {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIndex((i) => i + 1), 5000);
        return () => clearInterval(timer);
    }, []);

    const bgImg = bgImgArray[index % bgImgArray.length];
    console.log(bgImg);

    return (
        <div
            className="backgroundContainer"
            style={{
                backgroundImage: `url(${bgImg})`
            }}
        >
        </div>
    );
}
export default Image;