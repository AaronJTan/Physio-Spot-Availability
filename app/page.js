"use client"

import { api } from "@/client-side-api/fetchData";
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
  const [error, setError] = useState(false);

  useEffect(() => {
    const resetCalendarAndAvailableTimes = () => {
      setAvailableDays([]);
      setAvailableTimes([]);
      setSelectedDate(null);
    }

    const getPTAvailableDaysForMonth = async () =>  {
      try {
        const data = await api.fetchPTAvailableDaysForMonth(selectedPTId, currCalendar)
        setAvailableDays(data);
      } catch (error) {
        setError(true);
      }
    }

    resetCalendarAndAvailableTimes();
    getPTAvailableDaysForMonth();
  }, [selectedPTId, currCalendar])

  const handlePTSelect = (PTId) => {
    setSelectedPTtId(PTId);
    setSelectedDate();
  }

  const handleDaySelect = async (day) => {
    const selectedDay = new Date(currCalendar);
    selectedDay.setDate(day);
    setSelectedDate(selectedDay);

    try {
      const data = await api.fetchPTAvailableTimesOnDay(selectedPTId, selectedDay.toLocaleDateString());
      setAvailableTimes(data);
    } catch (error) {
      setError(true);
    }
  }

  if (error) {
    return (
        <div className="container p-4">
          Sorry, we were unable to fetch data from the external service.
          <br />
          Please try again later.
        </div>
    );
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