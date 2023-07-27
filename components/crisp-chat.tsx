"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("06e81ced-d8c9-4cb0-a3fe-fdde7f5cf930");
    }, []);

    return null;
}

