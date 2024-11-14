/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

interface GoogleRecaptchaProps {
    onVerify: (token: string | null) => void;
    onError?: () => void;
}

declare global {
    interface Window {
        grecaptcha: any;
        onRecaptchaLoad: () => void;
    }
}

export default function GoogleRecaptcha({
    onVerify,
    onError,
}: GoogleRecaptchaProps) {
    const [mounted, setMounted] = useState(false);
    const recaptchaRef = useRef<HTMLDivElement>(null);
    const [widgetId, setWidgetId] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
        return () => {
            if (widgetId !== null && window.grecaptcha) {
                window.grecaptcha.reset(widgetId);
            }
        };
    }, [widgetId]);

    const initializeRecaptcha = () => {
        if (!window.grecaptcha || !recaptchaRef.current) return;

        try {
            const id = window.grecaptcha.render(recaptchaRef.current, {
                sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                callback: onVerify,
                "error-callback": onError,
                size: "normal",
                theme: "light",
                badge: "bottomright",
                hl: "en", // Language
                isolated: true,
                challenge: true, // Request challenge explicitly
                "expired-callback": () => {
                    window.grecaptcha.reset(widgetId);
                },
            });
            setWidgetId(id);

            // Force challenge display after checkbox click
            const originalCallback = onVerify;
            const enhancedCallback = (token: string | null) => {
                if (token) {
                    window.grecaptcha.execute(id);
                }
                originalCallback(token);
            };

            // Override the callback
            window.grecaptcha.getResponse = () => null; // Force re-verification
        } catch (error) {
            console.error("Error initializing reCAPTCHA:", error);
            onError?.();
        }
    };

    useEffect(() => {
        window.onRecaptchaLoad = initializeRecaptcha;
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            <Script
                src={`https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit&hl=en`}
                strategy="afterInteractive"
            />
            <div
                ref={recaptchaRef}
                className="flex justify-center"
                style={{ minHeight: "100px" }} // Ensure enough space for the widget
            />
        </>
    );
}
