

const Confirmation = (props:any) => {
  return (
    <div className="confirm-container w-full p-5 rounded-lg border-light Border fixed top-52 margin-auto bg-white">
      <div className="conf-message">
        <p>Are you sure you want to delete?</p>
      </div>
      <div className="confirm-btn flex justify-end mt-5">
        <button className="confirm-cancel px-5 py-3 border-y-darkText bg-white text-darkText rounded-lg" onClick={props.onCancled}>
          No
        </button>
        <button className="confirm-delete px-5 py-3 border-black border-2  text-black my-3 rounded-lg" onClick={props.onDelete}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
