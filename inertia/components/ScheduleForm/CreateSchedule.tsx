import {useForm} from '@inertiajs/react';

function CreateSchedule(props:{folders:{id:number, name:string}[], date:string}) {

  const { data, setData, post, processing, errors } = useForm({
    folderId:'',
    description:'',
    workTime:'',
    day: new Date(props.date).toISOString().split('T')[0]
  });
  
  const submit = (e: any) => {
    e.preventDefault();
    post("/dashboard/schedule");
  };

  return (
    <>
      <form onSubmit={submit} className="flex justify-between join">
        <select className="select w-full max-w-xs join-item" onChange={e => setData('folderId', e.target.value)}>
          <option value="">Select a folder</option>
          {props.folders.map((folder: {id: number, name: string}) => {
            return <option key={folder.id} value={folder.id}>{folder.name}</option>
          })}
        </select>
        {/* <input type="hidden" value={data.folderId} /> */}
        {errors.folderId && <div>{errors.folderId}</div>}
        <input type="textarea" value={data.description} onChange={e => setData('description', e.target.value)} className="input input-bordered w-full bg-transparent join-item" placeholder="description"/>
        {errors.description && <div>{errors.description}</div>}
        <input type="number" step='0.01' min="0" max="100" value={data.workTime} onChange={e => setData('workTime', e.target.value)} className="input input-bordered w-full bg-transparent join-item" placeholder="work time"/>
        {errors.workTime && <div>{errors.workTime}</div>}
        <button type="submit" disabled={processing} className="btn w-36 self-end join-item">Add</button>
      </form>
    </>
  );
}

export default CreateSchedule;