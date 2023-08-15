export default function DayCell({ day, onDayClick }) {
    return (
        <button
            type="button"
            className="bg-orange-50 border border-slate-300 hover:border-emerald-400 h-14"
            onClick={(e) => onDayClick(e.target.innerHTML)}
        >
            {day}
        </button>
    );
}