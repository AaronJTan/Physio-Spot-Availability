import { NextResponse } from "next/server";

export function missingParamsResponse(missingParams) {
    const errorMsg = `Missing query parameters: ${missingParams.join(', ')}`;
    return NextResponse.json({ error: errorMsg }, { status: 400 })
}