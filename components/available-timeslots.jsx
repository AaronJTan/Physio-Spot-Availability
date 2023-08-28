
export default function AvailableTimeSlots({ timeslots, selectedDate }) {
    const selectDateMsg = <div className="font-medium my-10">Choose a date on the calendar to view available times</div>

    const groupedApptByDay = {};
    timeslots.forEach(appointment => {
        const dayPart = appointment.day_part;

        if (!groupedApptByDay[dayPart]) {
            groupedApptByDay[dayPart] = [];
        }

        groupedApptByDay[dayPart].push(appointment);
    });

    console.log(groupedApptByDay)

    const dayPartSlots = (group) => {
        if (group) {
            return group.map((item) => {
                const date = new Date();
                date.setHours(item.hour);
                date.setMinutes(item.minute)
                const formattedTime = date.toLocaleString('en-CA', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });

                return <div key={item.start_time_utc} className="bg-emerald-300 m-2">{formattedTime}</div>
            })
        }
    }

    const availableTimes = (
        <div className="grid grid-cols-3">
            {Object.keys(groupedApptByDay).map(dayPart => (
                <div key={dayPart} className={`col-start-${dayPart}`}>
                    {dayPartSlots(groupedApptByDay[dayPart])}
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full md:w-2/4 text-center bg-slate-100 p-2">

            {selectedDate &&
                <div className="bg-neutral-200 font-semibold">
                    {selectedDate.toLocaleString('en-CA', { month: 'long', day: "numeric", year: 'numeric' })}
                </div>
            }

            <div className="grid grid-cols-3 font-semibold">
                <div>Morning</div>
                <div>Afternon</div>
                <div>Evening</div>
            </div>

            {!timeslots.length ? selectDateMsg : availableTimes}
        </div>
    );
}