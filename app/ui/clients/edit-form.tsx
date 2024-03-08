import { Client } from "@/app/lib/definitions";

export default function EditClientForm({ client }: { client: Client }) {
  const month: string = String(client.date_of_birth.getMonth() + 1).padStart(
    2,
    "0"
  );
  const day: string = String(client.date_of_birth.getDate()).padStart(2, "0");
  const year: string = String(client.date_of_birth.getFullYear());

  const dateOfBirth: string = `${year}-${month}-${day}`;

  return (
    <div className="flex-1 overflow-auto bg-gray-50 rounded-xl">
      <form className="h-full flex-1 max-w-full flex flex-wrap flex-row p-4">
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
                name="first-name"
                id="first-name"
                defaultValue={client.first_name}
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
                defaultValue={client.email}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="h-fit">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="mt-2">
              <input
                type="tel"
                name="phone"
                id="phone"
                defaultValue={client.phone}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <fieldset className="h-fit grow flex flex-col">
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              Reminder Preferences
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600 whitespace-normal">
              How the client would like to be reminded of the next session.
            </p>
            <div className="mt-4 flex-1 justify-between flex flex-col">
              <div className="flex items-center gap-x-3">
                <input
                  id="push-everything"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-everything"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  None
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-email"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Text
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-nothing"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-nothing"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-nothing"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-nothing"
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
                name="last-name"
                id="last-name"
                defaultValue={client.last_name}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="h-fit">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Date of birth
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                defaultValue={dateOfBirth}
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
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="grow flex flex-col">
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="mt-4 block text-sm font-semibold leading-6 text-gray-900"
                >
                  Unit
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="mt-4 block text-sm font-semibold leading-6 text-gray-900"
                >
                  State
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="mt-4 block text-sm font-semibold leading-6 text-gray-900"
                >
                  Zipcode
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="flex h-1/6 w-full items-center justify-end gap-x-6 bg-white px-4">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
