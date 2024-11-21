import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { DateTime } from 'luxon';
import CreateSchedule from '~/components/ScheduleForm/CreateSchedule';
import EditSchedule from '~/components/ScheduleForm/EditSchedule';

function Schedule({ schedules, folders }) {
  const [currentWeek, setCurrentWeek] = useState(DateTime.now().startOf('week'));
  const [actualWeek, setActuelWeek] = useState(DateTime.now().startOf('week'));
  const [showWeekEnd, setShowWeekEnd] = useState(false);
  const [openFormDay, setOpenFormDay] = useState<string | null>(null);
  const [openEditFormDay, setOpenEditFormDay] = useState<string | null>(null);
  const [workTimeTotal, setWorkTimeTotal] = useState(0);
  const [selectedSchedule, setSelectedSchedule] = useState({ folderId: null, description: '', workTime: null, day: '' });

  const { user } = usePage().props;

  const nextWeek = () => {
    setCurrentWeek(currentWeek.plus({ weeks: 1 }));
  };

  const previousWeek = () => {
    setCurrentWeek(currentWeek.minus({ weeks: 1 }));
  };

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => currentWeek.plus({ days: i }));

  const toggleWeekEnd = () => {
    setShowWeekEnd(!showWeekEnd);
  };

  const toggleCreateShowForm = (day: string) => {
    setOpenFormDay(openFormDay === day ? null : day);
    openEditFormDay ? setOpenEditFormDay(null) : null;
  };
  
  const toggleEditShowForm = (day: string) => {
    setOpenEditFormDay(openEditFormDay === day ? null : day);
    openFormDay ? setOpenFormDay(null) : null;
  }

  const handleEditComplete = () => {
    setOpenEditFormDay(null);
  }

  const setPropsForEditForm = (day: string, props: any) => {
    toggleEditShowForm(day);
    setSelectedSchedule(props);
  }

  const getFolderName = (folderId: number) => {
    return folders.find((folder) => folder.id === folderId)?.name;
  }

  return (
    <>
      <h1>Schedule</h1>
      <div className="flex justify-between">
        <button className="btn" onClick={previousWeek}>Previous Week</button>
        <button className="btn" onClick={() => setCurrentWeek(actualWeek)}>Today</button>
        <button className="btn" onClick={nextWeek}>Next Week</button>
      </div>
      <div className="flex flex-col">
        {daysOfWeek
          .filter((day) => showWeekEnd || (!showWeekEnd && day.weekday < 6))
          .map((day) => (
            <div key={day.toISODate()} className="collapse collapse-plus">
              <input type="checkbox" defaultChecked={day.hasSame(DateTime.now(), 'day')} />
              <h2 className="collapse-title px-0">{day.toFormat('cccc, dd LLL yyyy')}</h2>
              <ul className="collapse-content flex flex-col px-0 gap-4">
              <button className="btn btn-secondary max-w-fit" onClick={() => toggleCreateShowForm(day.toISODate())}>add</button>
                {schedules
                  .filter((schedule) => DateTime.fromISO(schedule.day).hasSame(day, 'day'))
                  .filter((schedule) => user.id === schedule.userId)
                  .map((schedule) => (
                    <li key={schedule.id} className="flex flex-wrap justify-between items-center min-h-16 border-t odd:bg-black/20 px-4">
                      <div className="flex justify-between flex-1">
                        <span className="flex flex-col w-1/3 items-start">
                          <p>Folder</p>
                          <p>{getFolderName(schedule.folderId)}</p>
                        </span>
                        <span className="flex flex-col w-1/3">
                          <p>Description</p>
                          <p>{schedule.description}</p>
                        </span>
                        <span className="flex flex-col w-1/3 items-end pr-4">
                          <p>Work time</p>
                          <p>{schedule.workTime}h</p>
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setPropsForEditForm(day.toISODate(), schedule)} className="btn btn-success">Edit</button>
                        <Link href={`/dashboard/schedule/${schedule.id}`} method="delete" as="button" className="btn btn-error">Delete</Link>
                      </div>
                    </li>
                  ))}
                {openEditFormDay === day.toISODate() && (
                  <EditSchedule
                    folders={folders} 
                    date={day}
                    schedule={selectedSchedule}
                    onEditComplete={handleEditComplete}
                  />
                )}
                {openFormDay === day.toISODate() && <CreateSchedule folders={folders} date={day} />}
              </ul>
            </div>
          ))}
      </div>
      <div className="form-control max-w-48">
        <label className="label cursor-pointer px-0">
          <span className="label-text">See the week-end</span>
          <input type="checkbox" className="toggle" onChange={toggleWeekEnd} />
        </label>
      </div>
    </>
  );
}

export default Schedule;