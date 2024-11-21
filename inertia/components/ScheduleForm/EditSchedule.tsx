import React from 'react';
import { useForm } from '@inertiajs/react';

function EditSchedule({ folders, date, schedule, onEditComplete }) {
  const { data, setData, put, processing, errors } = useForm({
    folderId: schedule.folderId,
    description: schedule.description,
    workTime: schedule.workTime,
    day: date.toISODate()
  });

  const submit = async (e: any) => {
    e.preventDefault();
    await put(`/dashboard/schedule/${schedule.id}`, {
      onSuccess: () => {
        onEditComplete();
      }
    });
  };

  return (
    <form onSubmit={submit} className="flex justify-between join">
      <select className="select w-full max-w-xs join-item" onChange={e => setData('folderId', e.target.value)} value={data.folderId}>
        <option value="">Select a folder</option>
        {folders.map(folder => (
          <option key={folder.id} value={folder.id}>{folder.name}</option>
        ))}
      </select>
      {errors.folderId && <div>{errors.folderId}</div>}
      <input type="textarea" value={data.description} onChange={e => setData('description', e.target.value)} className="input input-bordered w-full bg-transparent join-item" placeholder="description"/>
      {errors.description && <div>{errors.description}</div>}
      <input type="number" step='0.01' min="0" max="100" value={data.workTime} onChange={e => setData('workTime', e.target.value)} className="input input-bordered w-full bg-transparent join-item" placeholder="work time"/>
      {errors.workTime && <div>{errors.workTime}</div>}
      <button type="submit" disabled={processing} className="btn w-36 self-end join-item">Save</button>
    </form>
  );
}

export default EditSchedule;