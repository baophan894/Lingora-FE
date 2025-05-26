import { Outlet } from 'react-router-dom';
import { NavbarComponent } from '../components/header/navbar-component';
import { FooterComponent } from '../components/footer/footer-component';

export const StudentLayout = () => {
  return (
    <>
      <NavbarComponent/>
      <Outlet/>
      <FooterComponent/>
    </>
  )
}
