import React, {useState, useEffect} from "react"

import NavBar from './navigate';
import FooterBar from "./footer"
import members from './content/team'

import { DataGrid } from "@mui/x-data-grid";

import collabs from "./content/collabs"

const Index=() => {


  const backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/team.jpeg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
  }
  
  let columns = [
        {field: 'firstName', headerName: 'First Name', flex: 1},
        {field: 'lastName', headerName: 'Last Name', flex: 1},
        {field: 'affiliation', headerName: 'Affiliation', flex: 1},
        {field: 'workingGroup', headerName: 'Working Group', flex: 1},
        {field: 'email', headerName: 'Email', flex: 1},
    ];

  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manuAbout" fixed={true}/>

      <div className="mx-auto w-full m,main-container" style={{paddingTop: "100px"}}>
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between mb-5"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              Introducing
            </p>
            <h3 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              Our <span style={{color:"var(--pickled-bluewood-600)"}}>Team</span>
            </h3>
          </div>
          <div className="sm:grid grid-cols-2 gap-6 my-10">
            {members.members.map((member, index) => {
              return(
                <div className="max-w-sm w-full lg:max-w-full lg:flex mx-auto my-10" key={index}>
              <div className="h-96 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                style={{backgroundImage: `url(../img/team/${member.imgName})`, backgroundPosition: "center"}}>
              </div>
              <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4">
                <div>
                  <a href={"mailto:" + member.email}
                    className="text-gray-900 font-bold text-xl mb-2 hover:text-bluewood-600 transition duration-500 ease-in-out">
                    {member.name}</a>
                  <p className="text-sm text-gray-600">
                    {member.title}
                  </p>
                  <p className="text-gray-900 font-bold text-base mt-4">
                    {member.role}
                  </p>    
                  <p className="text-gray-900 font-bold text-base mt-4">
                    Affiliation
                  </p>
                  <p className="text-sm text-gray-600">
                    {member.affiliation}
                  </p>
                  <div className="my-4 flex">
                    {
                      (member.webpage)&&<a className="mr-3" href={member.webpage}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z" clipRule="evenodd"/>
                        </svg>
                      </a>
                    }
                    <a className="mr-3" href={"mailto:" + member.email}>
                      <i className="fa fa-envelope"></i>
                    </a>
                    {
                      (member.orcid)&&<a className="mr-3 flex items-center" href={member.orcid}>
                        <img alt="ORCID logo" src="https://info.orcid.org/wp-content/uploads/2019/11/orcid_16x16.png" width="16px" height="16px"/>
                      </a>
                    }
                  </div>
                </div>  
              </div>
            </div>
            )})}
          </div>
          <h3 className="mb-10 sm:text-2xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", color:"var(--pickled-bluewood-900)"}}>
            List of Fine Collaborators
          </h3>
          <section id="DataGrid" style={{ height: 350, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
            <DataGrid rows={collabs.collabs} columns={columns} sx={{backgroundColor: "white"}}/>
          </section>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}


export default Index;