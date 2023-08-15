import DayCell from "./day-cell";
import DaysOfWeek from "./days-of-week";
import DisabledDayCell from "./disabled-day-cell";

export default function Calendar({ availableDays, currCalendar, setCurrCalendar, onDayClick }) {
    const year = currCalendar.getFullYear();
    const month = currCalendar.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const getDaysInMonthArray = () => {
        const numDaysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = Array.from({ length: numDaysInMonth }, (_, index) => index + 1);
        return daysArray;
    };

    const emptyCellsBeforeFirstDay = Array.from({ length: firstDayOfMonth }, (_, index) =>
        <DisabledDayCell key={index} />
    );
    const daysOfMonth = getDaysInMonthArray().map(day => {
        const isAvailable = availableDays.some((x) => x.day == day)
        const elem = isAvailable ? <DayCell key={day} day={day} onDayClick={onDayClick} /> : <DisabledDayCell key={day} day={day} />;

        return elem;
    });

    const getNumberOfRemainingCells = () => {
        const lastDay = new Date(year, month + 1, 0).getDate();
        let remainingCells = 7 - (firstDayOfMonth + lastDay) % 7;
        if (remainingCells == 7) remainingCells = 0;

        return remainingCells;
    }

    const emptyCellsAfterLastDay = Array.from({ length: getNumberOfRemainingCells() }, (_, index) => <DisabledDayCell key={index} />)

    const handlePrevMonthClick = (e) => {
        const newDate = new Date(currCalendar);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrCalendar(newDate);
    }

    const handleNextMonthClick = (e) => {
        const newDate = new Date(currCalendar);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrCalendar(newDate);
    }

    return (
        <div className="w-full md:w-2/4 p-1 border">
            <div className="grid gap-1 grid-cols-7 text-center border">
                <button
                    className="col-span-1 prev-month-btn bg-slate-200 disabled:opacity-0"
                    disabled={currCalendar.getMonth() == new Date().getMonth()}
                    type="button"
                    onClick={handlePrevMonthClick}
                >
                    &#60;
                </button>
                <div className="col-span-5 font-semibold">
                    {currCalendar.toLocaleDateString("en-CA", { month: "long", year: "numeric" })}
                </div>
                <button
                    className="col-span-1 next-month-btn bg-slate-200 disabled:opacity-0"
                    disabled={currCalendar.getMonth() == new Date().getMonth() + 2}
                    type="button"
                    onClick={handleNextMonthClick}
                >
                    &#62;
                </button>
            </div>

            <div className="grid gap-1 grid-cols-7 text-center">
                <DaysOfWeek />
                {emptyCellsBeforeFirstDay}
                {daysOfMonth}
                {emptyCellsAfterLastDay}
            </div>
        </div>
    );
}