import { CaptchaChallenge, CaptchaImage } from "@/types";
import crypto from "crypto";

const CATEGORIES = [
    "cars",
    "traffic_lights",
    "bicycles",
    "crosswalks",
    "buses",
    "stores",
];
const IMAGES_PER_CATEGORY = 4;

export function generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
}

export function generateChallenge(): CaptchaChallenge {
    const correctCategory =
        CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const otherCategories = CATEGORIES.filter((c) => c !== correctCategory);

    // Generate images array
    const images: CaptchaImage[] = [];

    // Add correct category images
    for (let i = 0; i < IMAGES_PER_CATEGORY; i++) {
        images.push({
            id: crypto.randomBytes(8).toString("hex"),
            url: `/captcha-images/${correctCategory}/${i + 1}.jpg`,
            category: correctCategory,
        });
    }

    // Add distractor images
    for (let i = 0; i < 5; i++) {
        const category =
            otherCategories[Math.floor(Math.random() * otherCategories.length)];
        images.push({
            id: crypto.randomBytes(8).toString("hex"),
            url: `/captcha-images/${category}/${
                Math.floor(Math.random() * IMAGES_PER_CATEGORY) + 1
            }.jpg`,
            category,
        });
    }

    // Shuffle images
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }

    return {
        id: crypto.randomBytes(8).toString("hex"),
        images,
        question: `Select all images with ${correctCategory.replace("_", " ")}`,
        correctCategory,
        token: generateToken(),
    };
}
