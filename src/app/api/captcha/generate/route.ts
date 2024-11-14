/* eslint-disable @typescript-eslint/no-unused-vars */
import { generateTextCaptcha } from "@/lib/captcha/generator";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const captcha = await generateTextCaptcha();
        return NextResponse.json(captcha);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to generate captcha" },
            { status: 500 }
        );
    }
}
