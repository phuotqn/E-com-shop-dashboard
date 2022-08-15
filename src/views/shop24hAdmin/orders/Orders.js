import React, { useState, useEffect } from 'react'

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
} from '@coreui/react'
import { Grid, TextField, Pagination, InputLabel, Select, MenuItem, Button, ButtonGroup } from '@mui/material'

import ModalAddNew from "./modal/ModalAddNew"
import ModalDelete from "./modal/ModalDelete"
import ModalEdit from './modal/ModalEdit'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  fontWeight: "bold",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");


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
   //Modal Edit
   const [rowClicked, setRowClicked] = useState([]);
   const [idEdit, setIdEdit] = useState("");
   const [shippedDateEdit, setShippedDateEdit] = useState("");
 
   const onBtnEditClick = (row) => {
     console.log("Nút sửa được click")
     console.log("ID: " + row._id)
     setOpenModalEdit(true)
     setRowClicked(row)
     setIdEdit(row._id)
     setShippedDateEdit(row.shippedDate.substring(0, 10))
   }
  //Modal Delete
  //ID
  const [idDelete, setIdDelete] = useState({ id: 0 });

  const onBtnDeleteClick = (row) => {
    console.log("Nút xóa được click")
    console.log("ID: " + row._id)
    setOpenModalDelete(true)
    setIdDelete(row._id)
  }



  //LOAD  API
  const fetchAPI = async (url, body) => {
    const response = await fetch(url, body)
    const data = await response.json()
    return data
  }
  
  useEffect(() => {
    if (filter == "") {
      fetchAPI('http://localhost:8000/orders')
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setOrders(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.error(error.message)
        });
    } else {
      var orderID = orders.filter((order, index) => {
        return order._id.toLowerCase().includes(filter.toLowerCase())
      })
      console.log(orderID)
      setOrders(orderID)
    }
  }, [filter, page, limit,varRefeshPage])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Orders</strong> <small>(Các mặt hàng được orders)</small>
          </CCardHeader>
          <CCardBody>
            <h3 className="text-medium-emphasis" align="center">
              Orders
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
                <InputLabel>orders</InputLabel>
              </Grid>
            </Grid>

            <Grid container mt={5} mb={1}>
              <Grid item xs={3}>
                <Button variant="contained" color="success" onClick={onBtnAddOrderClick}>Add new</Button>
              </Grid>
              <Grid item xs={9} align="right">
                <TextField size="small" label="Search" variant="outlined" value={filter}
                  onChange={(event) => setFilter(event.target.value)} />
              </Grid>
            </Grid>

            <CTable color="white" >
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ship Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Note</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Detail</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cost</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orders.map((orders, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{orders._id}</CTableDataCell>
                      <CTableDataCell>{orders.shippedDate.substring(0, 10)}</CTableDataCell>
                      <CTableDataCell>{orders.note}</CTableDataCell>
                      <CTableDataCell>
                        {orders.orderDetail.map((value, index) => {
                          return (
                            <div key={index}>
                              <p>{"Loại sản phẩm: " + value.id}</p>
                              <p>{"Số lượng: " + value.count}</p>
                              <br></br>
                            </div>
                          )
                        })
                        }
                      </CTableDataCell>
                      <CTableDataCell>{orders.cost}</CTableDataCell>
                      <CTableDataCell>
                        <ButtonGroup  style={{backgroundColor:"white"}}>
                          <Button className="bg-success mx-2"  style={{width:"50%",color:"white"}} onClick={() => {onBtnEditClick(orders)}}>edit</Button>
                          <Button className="bg-danger mx-2" style={{width:"50%" ,color:"white"}} value={index * index} onClick={() => { onBtnDeleteClick(orders) }}>delete</Button>
                        </ButtonGroup>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
            <Grid container mt={3} mb={2} justifyContent="flex-end">
              <Grid item >
                <Pagination count={noPage} color="info" defaultPage={1} onChange={onChangePagination} />
              </Grid>
            </Grid>
          </CCardBody>
          <ModalAddNew varRefeshPage={varRefeshPage} setOpenModalAdd={setOpenModalAdd} openModalAdd={openModalAdd} handleClose={handleClose} style={style} fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} />
          <ModalDelete varRefeshPage={varRefeshPage} setVarRefeshPage={setVarRefeshPage} style={style} openModalDelete={openModalDelete} idDelete={idDelete} handleCloseDelete={handleCloseDelete} />
          <ModalEdit idEdit={idEdit} shippedDateEdit={shippedDateEdit} varRefeshPage={varRefeshPage} openModalEdit={openModalEdit} handleCloseEdit={handleCloseEdit}
            style={style} fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} rowClicked={rowClicked}
          />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Orders
