"use client"

import AvailableTimeSlots from "@/components/available-timeslots";
import Calendar from "@/components/calendar/calendar";
import PTSelect from "@/components/pt-select";
import { physiotherapists } from "@/config/physiotherapists";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedPTId, setSelectedPTtId] = useState(physiotherapists[0].id);
  const [availableDays, setAvailableDays] = useState([]);
  const [currCalendar, setCurrCalendar] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    setAvailableDays([]);
    setAvailableTimes([]);
    setSelectedDate(null);

    async function getPTAvailableDaysForMonth() {
      fetch(`/api/bookings/days?practitioner_id=${selectedPTId}&month=${currCalendar.getMonth() + 1}`)
        .then((res) => res.json())
        .then((data) => setAvailableDays(data))
        .catch((err) => console.log(err));
    }

    getPTAvailableDaysForMonth();
  }, [selectedPTId, currCalendar])

  const handlePTSelect = (PTId) => {
    setSelectedPTtId(PTId);
    setCurrCalendar(new Date());
    setSelectedDate();
  }

  const handleDaySelect = async (day) => {
    const selectedDay = new Date(currCalendar);
    selectedDay.setDate(day);
    setSelectedDate(selectedDay);

    fetch(`/api/bookings/time_slots?practitioner_id=${selectedPTId}&date=${selectedDay.toLocaleDateString()}`)
      .then((res) => res.json())
      .then((data) => setAvailableTimes(data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="container p-4">
      <PTSelect selectedPTId={selectedPTId} onSelectPT={(PTId) => handlePTSelect(PTId)} />

      <div className="flex flex-wrap mt-4">
        <Calendar availableDays={availableDays} currCalendar={currCalendar} setCurrCalendar={setCurrCalendar} onDayClick={handleDaySelect} />
        <AvailableTimeSlots timeslots={availableTimes} selectedDate={selectedDate} />
      </div>
    </div>
  );
}