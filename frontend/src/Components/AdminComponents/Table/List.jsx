import React from 'react'
import Style from './Style.module.css'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";



const List = ({ rows }) => {


  return (
    <TableContainer component={Paper} className={Style.table}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={Style.tableCell}>Tracking ID</TableCell>
            <TableCell className={Style.tableCell}>Product</TableCell>
            <TableCell className={Style.tableCell}>Amount</TableCell>
            <TableCell className={Style.tableCell}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 && rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell className={Style.tableCell}>{row._id}</TableCell>
              <TableCell className={Style.tableCell}>
                <div className={Style.cellWrapper}>
                  <img
                    src={
                      row.images &&  row.images[0].url
                        ? row?.images[0].url
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                       
                    }
                    className={Style.image}
                    alt=""
                  />
                  {row.title}
                </div>
              </TableCell>
              <TableCell className={Style.tableCell}>{row.price}</TableCell>
              <TableCell className={Style.tableCell}>{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}

export default List