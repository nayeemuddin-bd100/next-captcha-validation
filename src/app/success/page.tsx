import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="rounded-full h-24 w-24 bg-green-100 mx-auto flex items-center justify-center">
                    <svg
                        className="h-12 w-12 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Verification Successful!
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    You have successfully completed the demo login and captcha
                    verification.
                </p>
                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
