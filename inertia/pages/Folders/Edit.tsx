import React from 'react';
import { useForm } from '@inertiajs/react';

function Edit(props: { folder: any }) {

  console.log(props.folder);
  const { data, setData, put, processing, errors } = useForm({
    id: props.folder.id,
    name: props.folder.name,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/dashboard/folders/${data.id}`);
  }

  return (
    <div>
      <h1>Create a folder</h1>

      <form onSubmit={submit} className="flex flex-col gap-6">
        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="input input-bordered w-full bg-transparent"/>
        {errors.name && <div>{errors.name}</div>}
        <button type="submit" disabled={processing} className="btn btn-accent w-36 self-end">Update</button>
      </form>
    </div>
  );
}

export default Edit;