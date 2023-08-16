const baseUrl = 'https://romano-sulit-physiotherapy-consulting.cliniko.com';
const appointmentTypeId = '207246';
const businessId = '48930';

export function getAvailableDaysUrl(month, physiotherapistId) {
    const params = new URLSearchParams();
    params.append('appointment_type_id', appointmentTypeId)
    params.append('business_id', businessId)
    params.append('month', month)
    params.append('practitioner_ids', physiotherapistId)

    const year = getYearOfGivenMonth(month);

    params.append('year', year)
    return `${baseUrl}/bookings/days?${params.toString()}`;
}

function getYearOfGivenMonth(month) {
    const currDate = new Date();
    let year = currDate.getFullYear();
    
    if (currDate.getMonth() == 11 && month == 12) {
        year += 1;
    };

    return year;
}

export function getAvailableTimeSlotsUrl(date, physiotherapistId) {
    const params = new URLSearchParams();
    params.append('appointment_type_id', appointmentTypeId)
    params.append('business_id', businessId)
    params.append('date', date)
    params.append('practitioner_ids', physiotherapistId)
    return `${baseUrl}/bookings/time_slots?${params.toString()}`;
}