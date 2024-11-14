export interface CaptchaImage {
    id: string;
    url: string;
    category: string;
}

export interface CaptchaChallenge {
    id: string;
    images: CaptchaImage[];
    question: string;
    correctCategory: string;
    token: string;
}

export interface CaptchaVerification {
    token: string;
    selectedImages: string[];
}

export interface CaptchaResponse {
    success: boolean;
    message: string;
    challenge?: CaptchaChallenge;
}
