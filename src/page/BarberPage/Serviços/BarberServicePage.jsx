// import styles from "./BarberServicePage.module.css";
import { Header } from "../../../components/Header.jsx";
import { WrapperDefault } from "../../../components/util/WrapperDefault.jsx";
import { FormService } from "../../../components/Form/FormService.jsx";

export function BarberServicePage() {

    const homePageBarberLinks = [
        { href: "/home", text: "Home" },
        { href: "/home/agenda", text: "Agenda" },
        { href: "/home/service", text: "Serviços" },
    ];
    
    return (
        <WrapperDefault>
        <Header
            showButton={false}
            isHomePageBarber={true}
            links={homePageBarberLinks}
        />
        <FormService />
        </WrapperDefault>
    );
    }