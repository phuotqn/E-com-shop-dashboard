import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import { Grid, TextField, Pagination, InputLabel, Select, MenuItem, Button, ButtonGroup } from '@mui/material'

import ModalAddNew from "./modal/ModalAddNew"
import ModalDelete from "./modal/ModalDelete"
import ModalEdit from "./modal/ModalEdit"
//Style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  fontWeight: "bold",
};


const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [customerPhone, setCustomerPhone] = useState("")
  const [orders, setOrders] = useState([]);

  //PANIGATION
  //Limit: số lượng bản ghi trên 1 trang
  const [limit, setLimit] = useState(10);
  //số trang: tổng số lượng sản phẩm / limit - Số lớn hơn gần nhất
  const [noPage, setNoPage] = useState(0);
  //Trang hiện tại
  const [page, setPage] = useState(1);
  //Load trang
  const [varRefeshPage, setVarRefeshPage] = useState(0);

  //PANIGATION
  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };
  const onChangePagination = (event, value) => {
    setPage(value);
  }

  //MODAL
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  //Đóng Modal
  const handleClose = () => setOpenModalAdd(false);
  const handleCloseEdit = () => setOpenModalEdit(false);
  const handleCloseDelete = () => setOpenModalDelete(false);

  //Modal Add New
  const onBtnAddOrderClick = () => {
    console.log("Nút thêm được click")
    setOpenModalAdd(true)
  }

  //Modal Delete
  //ID
  const [idDelete, setIdDelete] = useState({ id: 0 });
  const [idEdit,setIdEdit] = useState({ id: 0 });
  const [nameDelete, setNameDelete] = useState("");

  const onBtnDeleteClick = (row) => {
    console.log("Nút xóa được click")
    console.log("ID: " + row._id)
    setOpenModalDelete(true)
    setIdDelete(row._id)
    setNameDelete(row.fullName)
  }

  const onBtnEditClick = (row) => {
    console.log("Nút edit được bấm")
    console.log("ID: " + row._id)
    setOpenModalEdit(true)
    setIdEdit(row._id)
  }

  //LOAD  API
  const fetchAPI = async (url, body) => {
    const response = await fetch(url, body)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    if (customerPhone == "") {
      fetchAPI('http://localhost:8000/customers')
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setCustomers(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.log(error.message)
        })
    } else {
      fetchAPI(`http://localhost:8000/customers?phone=${customerPhone}`)
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setCustomers(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.error(error.message)
        });
    }
  }, [customerPhone, page, limit, varRefeshPage])

  useEffect(() => {
    fetchAPI('http://localhost:8000/orders')
      .then((data) => {
        setOrders(data.data)
        console.log(data)
      })
      .catch((error) => {
        console.error(error.message)
      });
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customers</strong>
          </CCardHeader>
          <CCardBody>
            <h3 className="text-medium-emphasis" align="center">
              Customers
            </h3>

            <Grid container sx={{ minWidth: 100 }} justifyContent="flex-end">
              <Grid item marginY={"auto"} mr={1}>
                <InputLabel>Show</InputLabel>
              </Grid>
              <Grid item>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={limit}
                  size="small"
                  onChange={handleChangeLimit}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </Grid>
              <Grid item marginY={"auto"} ml={1}>
                <InputLabel>customers</InputLabel>
              </Grid>
            </Grid>

            <Grid container mt={5} mb={1}>
              <Grid item xs={3}>
                <Button variant="contained" color="success" onClick={onBtnAddOrderClick}>Add new</Button>
              </Grid>
              <Grid item xs={9} align="right">
                <Grid item xs={9} align="right">
                  <TextField
                    size="small"
                    label="Search Phone"
                    variant="outlined"
                    onChange={(event) => { setCustomerPhone(event.target.value) }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <CTable color="white" >
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fullname</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">City</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {customers.map((customer, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{customer.fullName}</CTableDataCell>
                      <CTableDataCell>{customer.phone}</CTableDataCell>
                      <CTableDataCell>{customer.email}</CTableDataCell>
                      <CTableDataCell>{customer.address}</CTableDataCell>
                      <CTableDataCell>{customer.city}</CTableDataCell>
                      <CTableDataCell>{customer.country}</CTableDataCell>
                      <CTableDataCell>
                        <ButtonGroup style={{backgroundColor:"white"}} variant="contained">
                          <Button className="bg-success mx-2" style={{width:"50%",color:"white"}} onClick={() => {onBtnEditClick(customer)}}>edit</Button>
                          <Button className="bg-danger mx-2" style={{width:"50%",color:"white"}} value={index * index} onClick={() => { onBtnDeleteClick(customer) }}>delete</Button>
                        </ButtonGroup>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>

            <Grid container mt={3} mb={2} justifyContent="flex-end">
              <Grid item >
                <Pagination count={noPage} color="primary" defaultPage={1} onChange={onChangePagination} />
              </Grid>
            </Grid>
          </CCardBody>
          <ModalAddNew varRefeshPage={varRefeshPage} setOpenModalAdd={setOpenModalAdd} openModalAdd={openModalAdd} handleClose={handleClose} style={style} fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} />
          <ModalDelete varRefeshPage={varRefeshPage} setVarRefeshPage={setVarRefeshPage} style={style} openModalDelete={openModalDelete} idDelete={idDelete} nameDelete={nameDelete} handleCloseDelete={handleCloseDelete} />
          <ModalEdit varRefeshPage={varRefeshPage} setVarRefeshPage = {setVarRefeshPage} style = {style} openModalEdit={openModalEdit} setOpenModalEdit={setOpenModalEdit} idEdit={idEdit}  handleCloseEdit={handleCloseEdit} fetchAPI={fetchAPI}/>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Customers
