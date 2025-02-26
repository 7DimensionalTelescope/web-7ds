
import React from 'react';
import NavBar from './navigate';
import MainFrame from './main';
import type { MetaFunction } from "@remix-run/node";
import FooterBar from "./footer"
export const meta: MetaFunction = () => {
  return [
    { title: "7-dimensional telescope" },
    { name: "description", content: "7-dimensional telescope" },
  ];
};


const Index: React.FC = () => {
  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manuHome"/>
      <MainFrame />
      <FooterBar />
    </div>
  );
}


export default Index;