/* eslint-disable react/prop-types */
function DeleteConfirmation(props) {
  const { name, hide, confirmDelete } = props;

  return (
    <div className="">
      <div className="fixed top-1/2 left-1/2">
        <button type="button" onClick={hide}>
          X
        </button>
        <p>
          Are you sure you want to permanently delete
          {' '}
          {name}
        </p>
        <button type="button" onClick={confirmDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
