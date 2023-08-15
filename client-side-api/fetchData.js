export const api = {
    fetchPTAvailableDaysForMonth: async (selectedPTId, month) => {
        const res = await fetch(`/api/bookings/days?practitioner_id=${selectedPTId}&month=${month}`);
        return res.json();
    },

    fetchPTAvailableTimesOnDay: async (selectedPTId, date) => {
        const res = await fetch(`/api/bookings/time_slots?practitioner_id=${selectedPTId}&date=${date}`);
        return res.json();
    }
}