"use client"

import { useState, ReactNode, useEffect } from "react";
import Preloader from "../layout/Preloader";


export default function ClientWrapper ({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, [])

    if (loading) return <Preloader/>

    return <> {children} </>
}