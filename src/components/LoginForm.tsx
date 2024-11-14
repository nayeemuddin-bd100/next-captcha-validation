"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CaptchaVerification from "./CaptchaVerification";
import Button from "./ui/Button";
import Input from "./ui/Input";

const DEMO_CREDENTIALS = {
    username: "demo@example.com",
    password: "demo123",
};

export default function LoginForm() {
    const router = useRouter();
    const [credentials, setCredentials] = useState(DEMO_CREDENTIALS);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            credentials.username === DEMO_CREDENTIALS.username &&
            credentials.password === DEMO_CREDENTIALS.password
        ) {
            setError("");
            setShowCaptcha(true);
        } else {
            setError("Invalid credentials. Please use the demo credentials.");
        }
    };

    const handleCaptchaSuccess = () => {
        router.push("/success");
    };

    return (
        <div className="mt-8 space-y-6">
            {!showCaptcha ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Username"
                        type="email"
                        id="username"
                        value={credentials.username}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                username: e.target.value,
                            })
                        }
                    />
                    <Input
                        label="Password"
                        id="password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                password: e.target.value,
                            })
                        }
                        showPasswordToggle
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
            ) : (
                <CaptchaVerification onSuccess={handleCaptchaSuccess} />
            )}
        </div>
    );
}
