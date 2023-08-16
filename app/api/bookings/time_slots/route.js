import { NextResponse } from "next/server"
import { getAvailableTimeSlotsUrl } from "../apiEndpointGenerator";
import { missingParamsResponse } from "../../utils";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date')
    const practitionerId = searchParams.get('practitioner_id')

    const missingParams = checkMissingQueryParams({ date, practitionerId });

    if (missingParams.length > 0) {
        return missingParamsResponse(missingParams);
    }

    const url = getAvailableTimeSlotsUrl(date, practitionerId);

    try {
        const res = await fetch(url);
        if (!res.ok) {
            return NextResponse.json({ error: 'We were unable to fetch data. Please try again later.' }, { status: 503 })
        }

        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: 'We were unable to fetch data. Please try again later.' }, { status: 503 })
    }
}

function checkMissingQueryParams(params) {
    const missingParams = [];

    if (!params.date) {
        missingParams.push("date");
    }
    if (!params.practitionerId) {
        missingParams.push("practitioner_id");
    }

    return missingParams;
}
