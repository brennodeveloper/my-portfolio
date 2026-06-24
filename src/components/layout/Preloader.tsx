import { useEffect, useState } from "react";
import { clearInterval } from "timers";

const Preloader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval (() => {
            setProgress(prev => {
                if (prev > 100) {
                    clearInterval(interval)
                    return 100
                }

                const increment = 1 + Math.floor((100 - prev) / 10)
                return Math.min(prev + increment, 100)
            })
        }, 30)
    }, [])

    return (
            <div className={`fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-1000 ease-in-out ${progress ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="text-4xl md:text-6xl font-bold text-white mb-8">
                    Brenno Souza<span>.</span>
                </div>

                <div className="w-64 h-1 bg-white/20 relative rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-300 absolute left-0 top-0 transition-all duration-500 ease-out-expo" style={{width: `${progress}%`}}></div>       
                </div>

                <div className="mt-4 text-white/70 text-sm">
                    {progress}%
                </div>
            </div>
    )
}

export default Preloader