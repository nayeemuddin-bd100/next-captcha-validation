/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getImagesByCategory } from "@/lib/captcha/generator";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./ui/Button";

interface ImageCaptchaProps {
    onVerify: () => void;
    onError?: () => void;
}

const categories = [
    "cars",
    "traffic_lights",
    "bicycles",
    "crosswalks",
    "buses",
    "stores",
];

export default function ImageCaptcha({ onVerify, onError }: ImageCaptchaProps) {
    const [images, setImages] = useState<
        Array<{ id: string; url: string; category: string }>
    >([]);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");

    const loadImages = async () => {
        try {
            setLoading(true);
            setError("");
            const category =
                categories[Math.floor(Math.random() * categories.length)];
            const fetchedImages = await getImagesByCategory(category, 4);

            if (fetchedImages.length === 0) {
                throw new Error("Failed to load images");
            }

            setImages(fetchedImages);
            setCurrentCategory(category);
            setSelectedImages([]);
        } catch (err) {
            setError("Failed to load images. Please try again.");
            onError?.();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    const toggleImageSelection = (imageId: string) => {
        setSelectedImages((prev) =>
            prev.includes(imageId)
                ? prev.filter((id) => id !== imageId)
                : [...prev, imageId]
        );
    };

    const handleVerify = () => {
        if (selectedImages.length === 0) {
            setError("Please select at least one image");
            return;
        }

        const allCorrect = selectedImages.every((id) => {
            const image = images.find((img) => img.id === id);
            return image?.category === currentCategory;
        });

        if (allCorrect) {
            onVerify();
        } else {
            setError("Incorrect selection. Please try again.");
            loadImages();
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center space-y-4">
                <p className="text-red-500">{error}</p>
                <Button onClick={loadImages}>Try Again</Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">
                Select all images containing {currentCategory.replace("_", " ")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={`relative cursor-pointer border-2 rounded-lg overflow-hidden ${
                            selectedImages.includes(image.id)
                                ? "border-indigo-600"
                                : "border-transparent"
                        }`}
                        style={{ aspectRatio: "1/1" }}
                        onClick={() => toggleImageSelection(image.id)}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={image.url}
                                alt={`Select ${currentCategory}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                        {selectedImages.includes(image.id) && (
                            <div className="absolute inset-0 bg-indigo-600 bg-opacity-20 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <Button variant="outline" onClick={loadImages}>
                    New Images
                </Button>
                <Button
                    onClick={handleVerify}
                    disabled={selectedImages.length === 0}
                >
                    Verify
                </Button>
            </div>
        </div>
    );
}
