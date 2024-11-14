/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import svgCaptcha from "svg-captcha";

const svgOptions = {
    size: 6,
    noise: 2,
    color: true,
    width: 150,
    height: 50,
    fontSize: 50,
    charPreset: "0123456789",
};

export async function GET() {
    try {
        const captcha = svgCaptcha.create(svgOptions);
        return NextResponse.json({
            svg: captcha.data,
            text: captcha.text,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to generate captcha" },
            { status: 500 }
        );
    }
}
