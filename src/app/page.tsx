import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-3xl w-full space-y-8 text-center">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Secure Your Applications with Smart CAPTCHA
                    </h1>
                    <p className="text-xl text-gray-600">
                        A modern, user-friendly approach to verify human users
                        with dual verification methods
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                            <svg
                                className="w-6 h-6 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Easy to Use
                        </h2>
                        <ul className="text-left space-y-2 text-gray-600">
                            <li>✓ Simple login process</li>
                            <li>✓ Clear visual feedback</li>
                            <li>✓ Instant verification</li>
                            <li>✓ Mobile-friendly design</li>
                        </ul>
                    </div>

                    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                            <svg
                                className="w-6 h-6 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Choose Your Method
                        </h2>
                        <ul className="text-left space-y-2 text-gray-600">
                            <li>✓ Text-based CAPTCHA</li>
                            <li>✓ Image selection verification</li>
                            <li>✓ Refresh options</li>
                            <li>✓ Accessible design</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 space-y-4">
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-10 transition-colors"
                    >
                        Try Demo
                    </Link>
                    <p className="text-sm text-gray-500">
                        Experience our secure verification system with demo
                        credentials
                    </p>
                    <p className="text-xs text-gray-400">
                        Demo Credentials: demo@example.com / demo123
                    </p>
                </div>
            </div>
        </div>
    );
}
