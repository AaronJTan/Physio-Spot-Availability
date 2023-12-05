export const api = {
    fetchPTAvailableDaysForMonth: async (selectedPTId, dateObj) => {
        try {
            const res = await fetch(`/api/bookings/days?practitioner_id=${selectedPTId}&month=${dateObj.getMonth() + 1}&year=${dateObj.getFullYear()}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error)
            }

            return data;
        } catch (error) {
            throw error;
        }
    },

    fetchPTAvailableTimesOnDay: async (selectedPTId, date) => {
        try {
            const res = await fetch(`/api/bookings/time_slots?practitioner_id=${selectedPTId}&date=${date}`);
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error)
            }

            return data;
        } catch (error) {
            throw error;
        }
    }
}