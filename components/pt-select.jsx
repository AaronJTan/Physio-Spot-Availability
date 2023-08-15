import { physiotherapists } from "@/config/physiotherapists";

export default function PTSelect({ selectedPTId, onSelectPT }) {
    return (
        <div>
            <label>Viewing available bookings for: </label>
            <select
                className="p-1 rounded-md"
                name="physiotherapists"
                onChange={(e) => onSelectPT(e.target.value)}
                value={selectedPTId}
            >
                {physiotherapists.map((data) => (
                    <option value={data.id} key={data.id}>{data.name}</option>
                ))}
            </select>
        </div>
    );
}