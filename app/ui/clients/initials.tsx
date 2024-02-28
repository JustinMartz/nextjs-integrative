export default function InitalsCheckbox() {
  return (
    <span>
      <fieldset>
        <div className="flex items-center px-3 py-2 rounded-full bg-white shadow-md">
          <input type="checkbox" id="initials" name="initials" />
          <label htmlFor="initials" className="ml-2">Use initials</label>
        </div>
      </fieldset>
    </span>
  );
}

