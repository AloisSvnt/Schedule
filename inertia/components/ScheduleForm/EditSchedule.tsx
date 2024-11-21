import React from 'react';
import {useForm} from '@inertiajs/react';

function EditSchedule(props:{folders:{id:number, name:string}, schedule:{id:number, folderId:number, description:string, workTime:number, day:string}}) {

  const { data, setData, put, processing, errors } = useForm({
    folderId:props.schedule.folderId,
    description:props.schedule.description,
    workTime:props.schedule.workTime,
    day:props.schedule.day,
  });
  
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/dashboard/schedule/${props.schedule.id}`);
  };
  return (
    <>
      <form onSubmit={submit} className="flex justify-between join">
        <select className="select w-full max-w-xs join-item" value={data.folderId} onChange={e => setData('folderId', e.target.value)}>
          <option value="">Select a folder</option>
          {props.folders.map(folder => {
            return <option key={folder.id} value={folder.id}>{folder.name}</option>
          })}
        </select>
        {/* <input type="hidden" value={data.folderId} /> */}
        {errors.folderId && <div>{errors.folderId}</div>}
        <input type="textarea" value={data.description} onChange={e => setData('description', e.target.value)} className="input input-bordered w-full bg-transparent join-item" placeholder="description"/>
        {errors.description && <div>{errors.description}</div>}
        <input type="number" step='0.01' min="0" max="100" value={data.workTime} onChange={e => setData('workTime', e.target.value)} className="input input-bordered w-full bg-transparent join-item" placeholder="work time"/>
        {errors.workTime && <div>{errors.workTime}</div>}
        <button type="submit" disabled={processing} className="btn w-36 self-end join-item">Edit</button>
      </form>
    </>
  );
}

export default EditSchedule;