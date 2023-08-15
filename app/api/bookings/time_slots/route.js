import { NextResponse } from "next/server"
import { availableTimeSlotsUrlGenerator } from "../apiEndpointGenerator";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date')
    const practitioner_id = searchParams.get('practitioner_id')
    const url = availableTimeSlotsUrlGenerator(date, practitioner_id);
    const res = await fetch(url);
    const data = await res.json()
    return NextResponse.json(data)
}