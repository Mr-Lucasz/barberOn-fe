export const user = {
  id: "1",
  name: "John Doe",
  email: "johndoe@example.com",
  password: "password123",
  cpf: "00000000000",
  phone: "94981183574",
  isBarberOnEmployee: true,
  dateOfBirth: "1990-01-01",
  barberOnEmployeeFile: "path/to/barber/file",
  workingHours: [
    {
      dia: "Monday",
      status: "Disponível",
      workingHours: {
        start: "08:00:00",
        end: "17:00:00",
        pauses: [
          {
            start: "12:00:00",
            end: "13:00:00"
          }
        ]
      }
    },
    // ... Repeat for other days of the week
  ],
  services: [],
};