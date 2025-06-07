import React from 'react';
import { useState } from "react"
import { FooterComponent } from '../components/footer/footer-component';
import { Outlet } from 'react-router-dom';
import { NavbarComponent } from '../components/header/navbar-component';
import CourseBackgroundDecor from '../components/background-decoration/course-background';

export const CenterLayout = () => {

  return (
    <div>
      <NavbarComponent />
      <Outlet />
      <FooterComponent />
      <CourseBackgroundDecor />
    </div>
  )
};
