import { NextResponse } from "next/server"
import { getAvailableDaysUrl } from "../apiEndpointGenerator";
import { missingParamsResponse } from "../../utils";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month')
    const practitionerId = searchParams.get('practitioner_id')

    const missingParams = checkMissingQueryParams({ month, practitionerId });

    if (missingParams.length > 0) {
        return missingParamsResponse(missingParams);
    }

    const url = getAvailableDaysUrl(month, practitionerId);

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

    if (!params.month) {
        missingParams.push("month");
    }
    if (!params.practitionerId) {
        missingParams.push("practitioner_id");
    }

    return missingParams;
}