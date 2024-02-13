// const { Reminder, Privelege } = require("./definitions.ts");

const providers = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    email: "rosie@rosiescouch.com",
    firstName: "Roseanne",
    lastName: "Robinson",
    password: "123456",
    privelege: 5,
    practiceName: "Rosie's Couch",
  },
];

const clients = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    firstName: "Robert",
    lastName: "Martinez",
    email: "rob.martinez@fakebusiness.com",
    addressId: "d487e0b9-3b90-43a7-a464-d243f87242a1",
    phone: "516-676-5509",
    active: true,
    reminderPreference: 1,
    dateOfBirth: new Date(1990, 5, 15),
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily@johnson.com",
    addressId: "fee1f86d-f20f-4766-807d-dcc0a78e9b38",
    phone: "872-989-1701",
    active: true,
    reminderPreference: 2,
    dateOfBirth: new Date(1992, 3, 9),
  },
  {
    id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    addressId: "93b39bf9-d165-48a8-9fff-9f13217c2c20",
    phone: "720-556-5588",
    active: false,
    reminderPreference: 2,
    dateOfBirth: new Date(1985, 2, 10),
  },
  {
    id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
    firstName: "Jamal",
    lastName: "Washington",
    email: "jwash@example.com",
    addressId: "5a121d61-048d-4d00-9700-d93e6b89d076",
    phone: "303-455-1656",
    active: true,
    reminderPreference: 0,
    dateOfBirth: new Date(1985, 11, 25),
  },
  {
    id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
    firstName: "Emily",
    lastName: "Chen",
    email: "emilytheboss@fakerealestate.com",
    addressId: "7f4b18ce-8338-4543-bfb5-111ccd3d00cf",
    phone: "768-387-7832",
    active: true,
    reminderPreference: 3,
    dateOfBirth: new Date(1979, 10, 30),
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    firstName: "Malik",
    lastName: "Patel",
    email: "malikthagreat@harvard.edu",
    addressId: "111a52e0-8c36-42d8-a86e-8c493623f283",
    phone: "376-507-1212",
    active: false,
    reminderPreference: 0,
    dateOfBirth: new Date(1994, 1, 3),
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    firstName: "Taylor",
    lastName: "Nguyen",
    email: "tnguyen@fakechurch.org",
    addressId: "78d6b362-35ed-4e0a-81ab-8bfa87635c10",
    phone: "719-245-1600",
    active: true,
    reminderPreference: 1,
    dateOfBirth: new Date(1975, 5, 15),
  },
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
    firstName: "Sarah",
    lastName: "Brown",
    email: "browntown@example.com",
    addressId: "842ab688-d8ea-475e-ae0f-7a6ad81d2b4b",
    phone: "614-434-9844",
    active: true,
    reminderPreference: 2,
    dateOfBirth: new Date(1989, 7, 19),
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    firstName: "Al",
    lastName: "Dente",
    email: "tothetooth@pasta.com",
    addressId: "830d192e-1d38-4fb5-8f91-f03f2f3d2207",
    phone: "303-404-5383",
    active: true,
    reminderPreference: 0,
    dateOfBirth: new Date(1970, 9, 20),
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    firstName: "Ben",
    lastName: "Nevis",
    email: "tallest@scottishmountain.com",
    addressId: "fce96327-986c-40ad-b2b2-5ae30d1f65b1",
    phone: "916-422-4290",
    active: true,
    reminderPreference: 2,
    dateOfBirth: new Date(1983, 7, 11),
  },
];

const addresses = [
  {
    id: "d487e0b9-3b90-43a7-a464-d243f87242a1",
    street: "89 Strawberry Avenue",
    city: "Morrison",
    state: "Colorado",
    postalCode: "80465",
  },
  {
    id: "fee1f86d-f20f-4766-807d-dcc0a78e9b38",
    street: "45 Maple Lane",
    city: "Parker",
    state: "Colorado",
    postalCode: "80108", 
  },
  {
    id: "93b39bf9-d165-48a8-9fff-9f13217c2c20",
    street: "123 Race Street",
    city: "Denver",
    state: "Colorado",
    postalCode: "80209",
  },
  {
    id: "5a121d61-048d-4d00-9700-d93e6b89d076",
    street: "1900 S Everard Ct",
    city: "Evergreen",
    state: "Colorado",
    postalCode: "80439",
  },
  {
    id: "7f4b18ce-8338-4543-bfb5-111ccd3d00cf",
    street: "8000 N Hill Parkway",
    unit: "101",
    city: "Golden",
    state: "Colorado",
    postalCode: "80401",
  },
  {
    id: "111a52e0-8c36-42d8-a86e-8c493623f283",
    street: "76 E Windsor Ct",
    city: "Colorado Springs",
    state: "Colorado",
    postalCode: "80829",
  },
  {
    id: "78d6b362-35ed-4e0a-81ab-8bfa87635c10",
    street: "1101 Mulberry Ave",
    city: "Colorado Springs",
    state: "Colorado",
    postalCode: "80831",
  },
  {
    id: "842ab688-d8ea-475e-ae0f-7a6ad81d2b4b",
    street: "93 Space St",
    city: "Colorado Springs",
    state: "Colorado",
    postalCode: "80901",
  },
  {
    id: "830d192e-1d38-4fb5-8f91-f03f2f3d2207",
    street: "1670 W Washington Parkway",
    unit: "202",
    city: "Lakewood",
    state: "Colorado",
    postalCode: "80123",
  },
  {
    id: "fce96327-986c-40ad-b2b2-5ae30d1f65b1",
    street: "1421 S Suburban St",
    city: "Lakewood",
    state: "Colorado",
    postalCode: "80226",
  }
];

function dateString(dayIncrement, hour, minutes) {
  const currentDate = new Date();
  currentDate.setUTCHours(hour, minutes, 0, 0);
  currentDate.setUTCDate(currentDate.getUTCDate() + dayIncrement);
  return currentDate.toISOString().slice(0, -1);
}

const appointments = [
  {
    id: "5728c61e-733f-4a93-bbd4-87e23f46b35c",
    startTime: new Date(dateString(-1, 11, 0)),
    endTime: new Date(dateString(-1, 12, 0)),
    clientId: "3958dc9e-737f-4377-85e9-fec4b6a6442a" // Alice Smith prev. appt.
  },
  {
    id: "6f9ead6d-693f-4ca3-8850-b7cbdc6506b0",
    startTime: new Date(dateString(-1, 13, 30)),
    endTime: new Date(dateString(-1, 14, 30)),
    clientId: "50ca3e18-62cd-11ee-8c99-0242ac120002" // Jamal Washington prev. appt.
  },
  {
    id: "e77f3b66-e25f-4f73-a271-83e184ec17d1",
    startTime: new Date(dateString(-2, 9, 0)),
    endTime: new Date(dateString(-2, 10, 0)),
    clientId: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa" // Taylor Nguyen prev. appt.
  },
  {
    id: "7bd64e54-c19c-4ff9-8428-3d0788064518",
    startTime: new Date(dateString(-2, 10, 30)),
    endTime: new Date(dateString(-2, 11, 30)),
    clientId: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9" // Al Dente prev. appt.
  },
  {
    id: "ab1d91f6-8e16-4e70-9b00-cff775fb95f3",
    startTime: new Date(dateString(-4, 2, 0)),
    endTime: new Date(dateString(-4, 3, 30)),
    clientId: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66" // Sarah Brown prev. appt.
  },
  {
    id: "18b86055-9b27-41a1-b35c-9de45e2b4d75",
    startTime: new Date(dateString(0, 18, 0)),
    endTime: new Date(dateString(0, 19, 0)),
    clientId: "3958dc9e-787f-4377-85e9-fec4b6a6442a" // Emily Chen day-of appt.
  },
  {
    id: "ac7bba72-3286-4ca1-a440-4ec69748a3b6",
    startTime: new Date(dateString(1, 9, 0)),
    endTime: new Date(dateString(1, 10, 0)),
    clientId: "3958dc9e-712f-4377-85e9-fec4b6a6442a" // Robert Martinez
  },
  {
    id: "e3d2bef9-4eb9-4bc4-a62c-f4aa16c98828",
    startTime: new Date(dateString(1, 10, 30)),
    endTime: new Date(dateString(1, 11, 30)),
    clientId: "13D07535-C59E-4157-A011-F8D2EF4E0CBB" // Ben Nevis
  },
  {
    id: "f1cfcb11-cade-4211-84e6-518bc41e364d",
    startTime: new Date(dateString(1, 12, 0)),
    endTime: new Date(dateString(1, 13, 30)),
    clientId: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66" // Sarah Brown
  },
  {
    id: "7a5be497-2125-42b9-bbe5-ef14e009f634",
    startTime: new Date(dateString(2, 10, 0)),
    endTime: new Date(dateString(2, 11, 0)),
    clientId: "3958dc9e-742f-4377-85e9-fec4b6a6442a" // Emily Johnson
  },
  {
    id: "ca781e2b-524a-4193-bc2e-39a9effa23e1",
    startTime: new Date(dateString(2, 11, 0)),
    endTime: new Date(dateString(2, 12, 30)),
    clientId: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66" // Sarah Brown
  },
  {
    id: "020ef319-968d-454c-ac82-93dcdcf6b088",
    startTime: new Date(dateString(3, 18, 30)),
    endTime: new Date(dateString(3, 19, 30)),
    clientId: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9" // Al Dente
  },
  {
    id: "ef7f6fa7-5ebf-41d4-9fc9-fe6fa9520e44",
    startTime: new Date(dateString(4, 10, 0)),
    endTime: new Date(dateString(4, 11, 0)),
    clientId: "3958dc9e-787f-4377-85e9-fec4b6a6442a" // Emily Chen
  },
  {
    id: "a6a9f736-42b9-40bb-aa38-e876952b182f",
    startTime: new Date(dateString(4, 14, 30)),
    endTime: new Date(dateString(4, 15, 30)),
    clientId: "50ca3e18-62cd-11ee-8c99-0242ac120002" // Jamal Washington
  },
  {
    id: "6651ca4c-897e-419e-81f4-90a1fea49ea8",
    startTime: new Date(dateString(4, 16, 0)),
    endTime: new Date(dateString(4, 17, 0)),
    clientId: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa" // Taylor Nguyen
  },
  {
    id: "44214267-3788-4e71-b09e-08b66c4de404",
    startTime: new Date(dateString(5, 9, 0)),
    endTime: new Date(dateString(5, 10, 0)),
    clientId: "3958dc9e-737f-4377-85e9-fec4b6a6442a" // Alice Smith
  } 
];

module.exports = {
  providers,
  clients,
  addresses,
  appointments
};
