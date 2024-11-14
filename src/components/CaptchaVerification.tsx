/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import ImageCaptcha from "./ImageCaptcha";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface CaptchaVerificationProps {
    onSuccess: () => void;
}

export default function CaptchaVerification({
    onSuccess,
}: CaptchaVerificationProps) {
    const [captchaType, setCaptchaType] = useState<"text" | "image">("text");
    const [captchaValue, setCaptchaValue] = useState("");
    const [error, setError] = useState("");
    const [svgCaptcha, setSvgCaptcha] = useState<{
        svg: string;
        text: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const refreshCaptcha = async () => {
        if (captchaType !== "text") return;

        try {
            setLoading(true);
            const response = await fetch("/api/captcha/svg");
            if (!response.ok) throw new Error("Failed to load captcha");

            const data = await response.json();
            setSvgCaptcha(data);
            setCaptchaValue("");
            setError("");
        } catch (error) {
            setError("Failed to load captcha");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (captchaType === "text") {
            refreshCaptcha();
        }
    }, [captchaType]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            captchaType === "text" &&
            svgCaptcha &&
            captchaValue === svgCaptcha.text
        ) {
            onSuccess();
        } else {
            setError("Invalid captcha. Please try again.");
            setCaptchaValue("");
            refreshCaptcha();
        }
    };

    const handleCaptchaError = () => {
        setError("An error occurred during verification. Please try again.");
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            <div className="w-full flex justify-center space-x-4">
                <Button
                    variant={captchaType === "text" ? "primary" : "outline"}
                    onClick={() => {
                        setCaptchaType("text");
                        setError("");
                    }}
                >
                    Text Captcha
                </Button>
                <Button
                    variant={captchaType === "image" ? "primary" : "outline"}
                    onClick={() => {
                        setCaptchaType("image");
                        setError("");
                    }}
                >
                    Image Captcha
                </Button>
            </div>

            {captchaType === "text" ? (
                <div className="w-full space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                        {svgCaptcha && (
                            <div
                                className="bg-gray-100 p-4 rounded-md"
                                dangerouslySetInnerHTML={{
                                    __html: svgCaptcha.svg,
                                }}
                            />
                        )}
                        <Button
                            variant="outline"
                            onClick={refreshCaptcha}
                            disabled={loading}
                            title="Refresh Captcha"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                        </Button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            value={captchaValue}
                            onChange={(e) => setCaptchaValue(e.target.value)}
                            placeholder="Enter the code above"
                            error={error}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            Verify
                        </Button>
                    </form>
                </div>
            ) : (
                <div className="w-full">
                    <ImageCaptcha
                        onVerify={onSuccess}
                        onError={handleCaptchaError}
                    />
                </div>
            )}
        </div>
    );
}
