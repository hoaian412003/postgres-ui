export const CreateAccountDialog = () => {
  return (
    <dialog id="create-account" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create Account</h3>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
          <input type="text" className="input w-full" placeholder="Enter Name" />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="text" className="input w-full" placeholder="Enter Email" />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Policy</legend>
          <input type="text" className="input w-full" placeholder="Enter Policy" />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Role</legend>
          <input type="text" className="input w-full" placeholder="Enter Role" />
        </fieldset>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn btn-primary">Create</button>
            <button className="btn btn-dash">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
