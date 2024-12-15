"use client"

import Image from "next/image";
import placeholder from "./placeholder";
import { useState } from "react";

interface NijiImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const NijiImage = ({ src, alt, width, height }: NijiImageProps) => {
    const [imageSrc, setImageSrc] = useState(src.replace("ipfs://", "https://ipfs.aleph.im/ipfs/"));

    return (
        <Image
            className="drop-shadow-xl hover:drop-shadow-2xl"
            alt={alt}
            src={imageSrc}
            width={width}
            height={height}
            placeholder={placeholder}
            onError={() => setImageSrc("/placeholder_single.png")}
        />
    )
}

export default NijiImage;