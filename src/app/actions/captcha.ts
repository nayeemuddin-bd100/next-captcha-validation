/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { generateChallenge } from "@/lib/captcha/utils";
import { CaptchaResponse, CaptchaVerification } from "@/types";
import { revalidatePath } from "next/cache";

// In a real application, you would store these in a database
const challenges = new Map<
    string,
    { correctCategory: string; timestamp: number }
>();

export async function generateCaptchaChallenge(): Promise<CaptchaResponse> {
    const challenge = generateChallenge();

    // Store challenge details
    challenges.set(challenge.token, {
        correctCategory: challenge.correctCategory,
        timestamp: Date.now(),
    });

    // Clean up old challenges
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    for (const [token, data] of challenges.entries()) {
        if (data.timestamp < fiveMinutesAgo) {
            challenges.delete(token);
        }
    }

    return {
        success: true,
        message: "Challenge generated successfully",
        challenge,
    };
}

export async function verifyCaptcha(
    verification: CaptchaVerification
): Promise<CaptchaResponse> {
    const challenge = challenges.get(verification.token);

    if (!challenge) {
        return {
            success: false,
            message: "Invalid or expired CAPTCHA token",
        };
    }

    // Clean up used token
    challenges.delete(verification.token);

    // Verify the selection
    const correctImages = verification.selectedImages.every((_imageId) => {
        // In a real application, you would verify each image belongs to the correct category
        return true; // Simplified for demo
    });

    revalidatePath("/");

    if (correctImages) {
        return {
            success: true,
            message: "Verification successful",
        };
    }

    return {
        success: false,
        message: "Incorrect selection. Please try again",
        challenge: await generateCaptchaChallenge().then(
            (res) => res.challenge
        ),
    };
}
