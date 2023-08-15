export default function DisabledDayCell({ day }) {
    return (
        <button type="button" className="h-14 bg-zinc-50" disabled>{day}</button>
    );
}