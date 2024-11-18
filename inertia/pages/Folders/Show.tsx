function Show(props: {folder: {name: string, totalWorkTime: number}}) {

  return (
    <div>
      <h1>Folder Details</h1>
      <div>
        <p>{props.folder.name}</p>
        <p>{props.folder.totalWorkTime}</p>
      </div>
    </div>
  );
}

export default Show