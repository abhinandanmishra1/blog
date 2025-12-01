"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const AnimatedBox = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        let animationFrame: number;

        const animate = () => {
            if (isPlaying) {
                setRotation((prev) => (prev + speed * 2) % 360);
                animationFrame = requestAnimationFrame(animate);
            }
        };

        if (isPlaying) {
            animationFrame = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [isPlaying, speed]);

    const handleReset = () => {
        setIsPlaying(false);
        setRotation(0);
        setSpeed(1);
    };

    return (
        <div className="flex flex-col items-center gap-8 p-4 w-full max-w-md mx-auto">
            {/* Animation Stage */}
            <div className="relative w-32 h-32 flex items-center justify-center">
                <div
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 border border-white/10"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: isPlaying ? 'none' : 'transform 0.3s ease-out'
                    }}
                />
                {/* Helper ring */}
                <div className="absolute inset-0 border-2 border-dashed border-neutral-800 rounded-full opacity-20" />
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4 w-full bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                            title={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <button
                            onClick={handleReset}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                            title="Reset"
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs font-medium text-neutral-500 uppercase">Speed</span>
                        <input
                            type="range"
                            min="0.1"
                            max="5"
                            step="0.1"
                            value={speed}
                            onChange={(e) => setSpeed(parseFloat(e.target.value))}
                            className="flex-1 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                        />
                        <span className="text-xs font-mono text-neutral-400 w-8 text-right">{speed.toFixed(1)}x</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
