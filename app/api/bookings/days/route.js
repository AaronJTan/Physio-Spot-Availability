import { NextResponse } from "next/server"
import { availableDaysUrl } from "../apiEndpointGenerator";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month')
    const practitioner_id = searchParams.get('practitioner_id')
    const url = availableDaysUrl(month, practitioner_id);
    const res = await fetch(url);
    const data = await res.json()
    return NextResponse.json(data)
}