import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events.js";
import styles from "./HomePageClient.module.css";
import { Header } from "../../components/Header.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { WrapperDefault } from "../../components/util/WrapperDefault.jsx";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export function HomePageClient() {
  const [eventsData, setEventsData] = useState(events);

  const homePageBarberLinks = [
    { href: "/homeclient", text: "Home" },
    { href: "/homeclient/agendar", text: "Agendar" },
    { href: "/homeclient/historico", text: "Historico" },
  ];

  //criar uma constante para Styles de calendar
  const myStyle = {
    display: "flex",
    backgroundColor: "white",
    color: "black",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };
  return (
    <WrapperDefault>
    <div className={styles.wrapperCalendar}>
      <Header
        showButton={false}
        isHomePageBarber={true}
        links={homePageBarberLinks}
        onClickVerPerfil={() => handleClickVerPerfil("/homeclient/perfil")}
      />
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={myStyle}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
    </WrapperDefault>
  );
}
