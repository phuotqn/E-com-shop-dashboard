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
  CButton,
  CButtonGroup
} from '@coreui/react'
import { Grid, TextField, Pagination, InputLabel, Select, MenuItem } from '@mui/material'

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


import ModalAddNew from "./modal/ModalAddNew"
import ModalDelete from "./modal/ModalDelete"
import ModalEdit from './modal/ModalEdit';
const ProductTypes = () => {
  const [productTypes, setProductTypes] = useState([])
  const [typeName, setTypeName] = useState("");


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
  const [nameDelete, setNameDelete] = useState("");
  const [idEdit,setEdit] = useState({id:0});
  const onBtnDeleteClick = (row) => {
    console.log("Nút xóa được click")
    console.log("ID: " + row._id)
    setOpenModalDelete(true)
    setIdDelete(row._id)
    setNameDelete(row.name)
  }

  const onBtnEditClick = (row) => {
    console.log("Nút edit được bấm")
    console.log("ID: " + row._id)
    setOpenModalEdit(true)
    setEdit(row._id)

  }

  //LOAD  API
  const fetchAPI = async (url, body) => {
    const response = await fetch(url, body)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    if (typeName == "") {
      fetchAPI('http://localhost:8000/producttypes')
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setProductTypes(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.error(error.message)
        });
    } else {
      fetchAPI(`http://localhost:8000/producttypes?name=${typeName}`)
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setProductTypes(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
  }, [typeName, page, limit, varRefeshPage])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product Types</strong> <small>(Các loại sản phẩm được của shop)</small>
          </CCardHeader>
          <CCardBody>
            <h3 className="text-medium-emphasis" align="center">
              Product Types
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
                <InputLabel>products</InputLabel>
              </Grid>
            </Grid>

            <Grid container mt={5} mb={1}>
              <Grid item xs={3}>
                <CButton onClick={onBtnAddOrderClick} className="btn btn-success text-white">ADD NEW</CButton>
              </Grid>
              <Grid item xs={9} align="right">
                <TextField onChange={(event) => setTypeName(event.target.value)} size="small" label="Search" variant="outlined" />
              </Grid>
            </Grid>

            <CTable color="white">
              <CTableHead>
                <CTableRow className='text-center' style={{alignItems: 'center'}}>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {productTypes.map((productTypes, index) => {
                  return (
                    <CTableRow key={index} className="text-center">
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{productTypes.name}</CTableDataCell>
                      <CTableDataCell>{productTypes.description}</CTableDataCell>
                      <CTableDataCell>
                        <CButtonGroup>
                          <CButton color="success" className="text-white mx-2" style={{width:"50%"}} onClick= {() => {onBtnEditClick(productTypes)}}>EDIT</CButton>
                          <CButton color="danger" className="text-white mx-2" style={{width:"50%"}} value={index * index} onClick={() => { onBtnDeleteClick(productTypes) }}>DELETE</CButton>
                        </CButtonGroup>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
          <ModalAddNew varRefeshPage={varRefeshPage} setOpenModalAdd={setOpenModalAdd} openModalAdd={openModalAdd} handleClose={handleClose} style={style} fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} />
          <ModalDelete varRefeshPage={varRefeshPage} setVarRefeshPage={setVarRefeshPage} style={style} openModalDelete={openModalDelete} idDelete={idDelete} nameDelete={nameDelete} handleCloseDelete={handleCloseDelete} />
          <ModalEdit varRefeshPage={varRefeshPage} setVarRefeshPage = {setVarRefeshPage} style = {style} openModalEdit={openModalEdit} idEdit={idEdit}  handleCloseEdit={handleCloseEdit} fetchAPI={fetchAPI}/>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProductTypes
