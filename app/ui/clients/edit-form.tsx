"use client";

import { updateClient } from "@/app/lib/actions";
import { Address, Client } from "@/app/lib/definitions";
import { useState, useEffect, MouseEventHandler, ChangeEvent } from "react";

export default function EditClientForm({
  client: initialClient,
  address: initialAddress,
}: {
  client: Client;
  address: Address;
}) {
  const [formDataChanged, setFormDataChanged] = useState(false);
  const [formClient, setFormClient] = useState(initialClient);
  const [formAddress, setFormAddress] = useState(initialAddress);
  const [resetForm, setResetForm] = useState(false); // New state for reset flag

  const updateClientWithId = updateClient.bind(null, initialClient.id);

  const month: string = String(initialClient.date_of_birth.getMonth() + 1).padStart(
    2,
    "0"
  );
  const day: string = String(initialClient.date_of_birth.getDate()).padStart(2, "0");
  const year: string = String(initialClient.date_of_birth.getFullYear());

  const dateOfBirth: string = `${year}-${month}-${day}`;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name + ' ' + e.target.value);
    const { name, value } = e.target;
    setFormClient({
      ...formClient,
      [name]: value
    });

    setFormAddress({
        ...formAddress,
        [name]: value
      });
      if (name === "reminder_preference") {
        // Update the formDataChanged state when reminder_preference is changed
        setFormDataChanged(true);
      }
  };

  useEffect(() => {
    const formHasChanged =
    initialClient.first_name !== formClient.first_name ||
    initialClient.last_name !== formClient.last_name ||
    initialClient.email !== formClient.email ||
    initialClient.phone !== formClient.phone ||
    initialClient.reminder_preference !== formClient.reminder_preference ||
    initialClient.date_of_birth !== formClient.date_of_birth ||
    initialAddress.street !== formAddress.street ||
    initialAddress.unit !== formAddress.unit ||
    initialAddress.city !== formAddress.city ||
    initialAddress.state !== formAddress.state ||
    initialAddress.postal_code !== formAddress.postal_code;

    setFormDataChanged(formHasChanged);
  }, [formClient, formAddress, initialClient, initialAddress]);

  useEffect(() => {
    // This effect is triggered whenever formDataChanged changes
    // It can be used to perform any actions after the form data has changed
    console.log("Form data has changed:", formDataChanged);
  }, [formDataChanged]);

  useEffect(() => {
    if (resetForm) {
      // Reset the form data when resetForm is true
      setFormClient(initialClient);
      setFormAddress(initialAddress);
      setFormDataChanged(false);
      setResetForm(false); // Reset the resetForm state
        console.log('formClient: ', formClient.first_name);

    }
  }, [resetForm, initialClient, initialAddress, formClient]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formDataChanged) {
      //   updateClient.bind(null, client.id);
      const formData = new FormData(event.currentTarget);
      updateClientWithId(formData);
      setFormDataChanged(false);
    }
  };

//   const handleCancelClick: MouseEventHandler<HTMLButtonElement> = (event) => {
//     console.log('is this getting called?')
//     event.preventDefault();
//     resetForm(); // Call your resetForm function here
//   };

//   const resetForm = () => {
//       setFormDataChanged(false);
//     console.log('resetForm() called');
//     console.log('initialClient: ' + initialClient.first_name)
//     setFormClient(initialClient);
//     setFormAddress(initialAddress);
//     console.log('formClient: ', formClient.first_name);
//   };
// const handleCancelClick = () => {
//     // Set the resetForm state to true when Cancel button is clicked
//     // setResetForm(true);
//   };

// const handleCancelClick = () => {
//     Array.from(document.querySelectorAll("input")).forEach(
//       input => (input.value = "")
//     );
//   };

const handleCancelClick = () => {
    // Get all input elements in the document
    const inputs = document.querySelectorAll("input");
  
    // Iterate over each input element
    inputs.forEach(input => {
      // Get the name attribute of the input
      const name = input.getAttribute("name");
  
      if (name === "reminder_preference") {
        // Check if the value matches the initialClient's reminder_preference
        const checkedValue = parseInt(input.value);
        const isChecked = checkedValue === initialClient.reminder_preference;
        input.checked = isChecked; // Set the checked attribute
      } else {
        // For other inputs, set the value attribute as before
        if (name && initialClient.hasOwnProperty(name)) {
          const value = name === "date_of_birth" ? dateOfBirth : (initialClient as any)[name];
          input.value = value;
        }
        if (name && initialAddress.hasOwnProperty(name)) {
          input.value = (initialAddress as any)[name];
        }
      }
    });
  
    // Reset the form data to initial values
    setFormDataChanged(false);
  };
  
  

  return (
    <div className="flex-1 overflow-auto bg-gray-50 rounded-xl">
      <form
        className="h-full flex-1 max-w-full flex flex-wrap flex-row p-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-col md:flex-wrap w-1/2 gap-y-4 px-4 bg-white">
          <div className="h-fit mt-4">
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first_name"
                id="first-name"
                defaultValue={formClient.first_name}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="h-fit">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={formClient.email}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="h-fit">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="mt-2">
              <input
                type="tel"
                name="phone"
                id="phone"
                defaultValue={formClient.phone}
                onChange={handleInputChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <fieldset className="h-fit grow flex flex-col">
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              Reminder Preference
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600 whitespace-normal">
              How the client would like to be reminded of the next session.
            </p>
            <div className="mt-4 flex-1 justify-between flex flex-col">
              <div className="flex items-center gap-x-3">
                <input
                  id="reminders-none"
                  name="reminder_preference"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  defaultChecked={formClient.reminder_preference === 0}
                  onChange={handleInputChange}
                  value={0}
                />
                <label
                  htmlFor="reminders-none"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  None
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="reminders-text"
                  name="reminder_preference"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  defaultChecked={formClient.reminder_preference === 1}
                  onChange={handleInputChange}
                  value={1}
                />
                <label
                  htmlFor="reminders-text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Text
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="reminders-email"
                  name="reminder_preference"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  defaultChecked={formClient.reminder_preference === 2}
                  onChange={handleInputChange}
                  value={2}
                />
                <label
                  htmlFor="reminders-email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="reminders-both"
                  name="reminder_preference"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  defaultChecked={formClient.reminder_preference === 3}
                  onChange={handleInputChange}
                  value={3}
                />
                <label
                  htmlFor="reminders-both"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Text and email
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col md:flex-col md:flex-wrap w-1/2 gap-y-4 px-4 bg-white">
          <div className="h-fit mt-4">
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last_name"
                id="last-name"
                defaultValue={formClient.last_name}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="h-fit">
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Date of birth
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="date_of_birth"
                id="dateOfBirth"
                defaultValue={dateOfBirth}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <fieldset className="h-fit">
            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street"
                  id="street-address"
                  defaultValue={formAddress.street}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="grow flex flex-col">
              <div className="col-span-full">
                <label
                  htmlFor="unit"
                  className="mt-4 block text-sm font-semibold leading-6 text-gray-900"
                >
                  Unit
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    defaultValue={formAddress.unit}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="city"
                  className="mt-4 block text-sm font-semibold leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    defaultValue={formAddress.city}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="w-2/3">
                  <label
                    htmlFor="state"
                    className="mt-4 block text-sm font-semibold leading-6 text-gray-900"
                  >
                    State
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      defaultValue={formAddress.state}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="w-1/3">
                  <label
                    htmlFor="postal-code"
                    className="mt-4 block text-sm font-semibold leading-6 text-gray-900"
                  >
                    ZIP Code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postalCode"
                      id="postal-code"
                      defaultValue={formAddress.postal_code}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="flex h-1/6 w-full items-center justify-end gap-x-6 bg-white px-4">
          <button
            type="button"
            disabled={!formDataChanged}
            onClick={handleCancelClick}
            className={`text-sm font-semibold leading-6  ${formDataChanged ? "text-gray-900" : "cursor-default text-gray-300"}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formDataChanged}
            className={`rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              formDataChanged
                ? ""
                : "cursor-default bg-gray-300 hover:bg-gray-300"
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
