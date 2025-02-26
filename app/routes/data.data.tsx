import React, {useState, useEffect} from "react"
import { Table } from 'flowbite-react';
import { Pagination } from 'flowbite-react';

import NavBar from './navigate';
import FooterBar from "./footer"

import ScatterGeoPlot from './plot'

import data from './content/data'


const Index=() => {

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manuData" fixed={true}/>

      <div className="mx-auto w-full main-container" style={{paddingTop: "200px"}}>
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              Invaluable Observations
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              <span style={{color:"var(--pickled-bluewood-600)"}}>Data</span> Archive 
            </h3>
          </div>
          <div className="flex w-full justify-center">
            <ScatterGeoPlot data={data} height="400" width="800" />
          </div>

          <Table striped>
            <Table.Head>
              <Table.HeadCell>Target</Table.HeadCell>
              <Table.HeadCell>R.A.</Table.HeadCell>
              <Table.HeadCell>Dec.</Table.HeadCell>
              <Table.HeadCell>Exposure</Table.HeadCell>
              <Table.HeadCell>Significance</Table.HeadCell>
              <Table.HeadCell>Details</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {paginatedData.map((d, index) => {
                return(
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {d.name}
                    </Table.Cell>
                    <Table.Cell>{d.ra}</Table.Cell>
                    <Table.Cell>{d.dec}</Table.Cell>
                    <Table.Cell>{d.exposure}</Table.Cell>
                    <Table.Cell>{d.sigma}</Table.Cell>
                    <Table.Cell>
                      {(d.ref===false)?
                        <a href="mailto:mim@astro.snu.ac.kr" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                          Contact
                        </a>:
                        <a href={d.ref} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                          Link
                        </a>
                      }
                      
                    </Table.Cell>
                  </Table.Row>
              )})}
            </Table.Body>
          </Table>
          <div className="flex justify-center mt-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}


export default Index;
      