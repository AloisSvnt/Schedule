import { useForm } from "@inertiajs/react";

function Create(){

  const { data, setData, post, processing, errors } = useForm({
    name: "",
  });
  
  const submit = (e: any) => {
    e.preventDefault();
    post("/dashboard/folders");
  };

  return (
    <>
      <h1>Create a folder</h1>

      <form onSubmit={submit} className="flex flex-col gap-6">
        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="input input-bordered w-full bg-transparent"/>
        {errors.name && <div>{errors.name}</div>}
        <button type="submit" disabled={processing} className="btn btn-accent w-36 self-end">Create</button>
      </form>
    </>
  )
}

export default Create