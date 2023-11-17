import axios from 'axios';


export const handleClickUpdate = async (event, user, setUser, id, generateAgenda) => {
  event.preventDefault();
  const agenda = generateAgenda();

  // Atualize o usuário no estado
  setUser({ ...user, workingHours: agenda });

  // Atualize a agenda e as pausas no backend
  const response = await axios.put(
    `http://localhost:8080/api/agendas/barbeiro/${id}/bulk`,
    agenda
  );

  if (response.ok) {
    console.log("Agenda atualizada com sucesso");
  } else {
    console.error("Erro ao atualizar a agenda");
  }
};