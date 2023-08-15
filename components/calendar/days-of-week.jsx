export default function DaysOfWeek() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return daysOfWeek.map((day, idx) => (
        <div key={idx} className="font-medium">{day.substring(0, 1)}</div>
    ));
}