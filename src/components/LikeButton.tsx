"use client";

import { useEffect, useState } from "react";
import styles from "./like-button.module.css";

const MAX_LIKES = 16;

export default function LikeButton({ slug }: { slug: string }) {
    const [total, setTotal] = useState(0);
    const [myLikes, setMyLikes] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`/api/likes/${slug}`);
                const data = await res.json();
                setTotal(data.total || 0);
                setMyLikes(data.userLikes || 0);
            } catch (error) {
                console.error("Failed to load likes:", error);
            }
        }
        load();
    }, [slug]);

    async function handleClick() {
        if (myLikes >= MAX_LIKES) return;

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 600);

        try {
            const res = await fetch(`/api/likes/${slug}`, {
                method: "POST",
            });

            if (res.status === 403) {
                return;
            }

            if (res.ok) {
                setMyLikes((x) => x + 1);
                setTotal((t) => t + 1);
            }
        } catch (error) {
            console.error("Failed to like:", error);
        }
    }

    const likePercentage = Math.min((myLikes / MAX_LIKES) * 100, 100);
    const uniqueId = `like-gradient-${slug}`;

    return (
        <button
            onClick={handleClick}
            className={styles.likeButton}
            style={{
                transform: isAnimating ? "scale(1.1)" : "scale(1)",
                transition: "transform 250ms",
            }}
        >
            <span
                className={styles.heartContainer}
                data-bounce={isAnimating}
            >
                <svg
                    width="48"
                    height="40.32"
                    viewBox="0 0 50 42"
                    fill="none"
                    className={styles.heartSvg}
                    style={{
                        transform: isAnimating ? "rotate(8deg)" : "rotate(0deg)",
                        transition: "transform 300ms",
                    }}
                >
                    <defs>
                        <linearGradient
                            id={`active-gradient-${uniqueId}`}
                            x1="25"
                            y1="42"
                            x2="26.3796"
                            y2="0.0453673"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#ff6b6b" />
                            <stop offset="0.5" stopColor="#ee5a6f" />
                            <stop offset="1" stopColor="#c44569" />
                        </linearGradient>
                        <linearGradient
                            id={`inactive-gradient-${uniqueId}`}
                            x1="15"
                            y1="41"
                            x2="42"
                            y2="-1.5"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="rgba(255,255,255,0.15)" stopOpacity="0.6" />
                            <stop offset="1" stopColor="rgba(255,255,255,0.05)" stopOpacity="0.4" />
                        </linearGradient>
                        <mask
                            id={`active-gradient-mask-${uniqueId}`}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="50"
                            height="42"
                        >
                            <polygon
                                points={`0,42 50,42 50,${42 - (42 * likePercentage) / 100} 0,${42 - (42 * likePercentage) / 100
                                    }`}
                                fill="#000000"
                                style={{ transition: "all 300ms ease-out" }}
                            />
                        </mask>
                    </defs>

                    {/* Heart shape - base layer */}
                    <path
                        d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
                        fill={`url(#inactive-gradient-${uniqueId})`}
                    />
                    {/* Heart shape - filled layer with mask */}
                    <g mask={`url(#active-gradient-mask-${uniqueId})`}>
                        <path
                            d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
                            fill={`url(#active-gradient-${uniqueId})`}
                        />
                    </g>

                    {/* Eyes */}
                    <g style={{ opacity: myLikes > 0 ? 1 : 0.5, transition: "opacity 200ms" }}>
                        <circle cx="15" cy="22" r="2" fill="#000" />
                        <circle cx="35" cy="22" r="2" fill="#000" />
                    </g>

                    {/* Smile */}
                    <g style={{ opacity: myLikes > 0 ? 1 : 0.5, transition: "opacity 200ms" }}>
                        <path
                            d="M 20 28 Q 25 33 30 28"
                            stroke="#000"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </span>
            <span className={styles.count}>
                {total}
            </span>
        </button>
    );
}
