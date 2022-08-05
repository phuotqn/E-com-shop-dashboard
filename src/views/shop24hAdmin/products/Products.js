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


const Products = () => {
  const [rowProducts, setRowProducts] = useState([]);

  const [nameProduct, setNameProduct] = useState("");

  const [imageUrlProp,setUrl] = useState("")
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

  const onBtnDeleteClick = (row) => {
    console.log("Nút xóa được click")
    console.log("ID: " + row._id)
    setOpenModalDelete(true)
    setIdDelete(row._id)
    setNameDelete(row.name)
  }

  const onBtnEditClick = (row) => {
    console.log("Nút được bấm")
    console.log("Id: " + row._id)
    console.log(row.imageUrl)
    setOpenModalEdit(true)
    setIdDelete(row._id)
    setUrl(row.imageUrl)
  }
  //LOAD  API
  const fetchAPI = async (url, body) => {
    const response = await fetch(url, body)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    if (nameProduct == "") {
      fetchAPI('http://localhost:8000/products')
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setRowProducts(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.error(error.message)
        });
    } else {
      fetchAPI(`http://localhost:8000/products?name=${nameProduct}`)
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setRowProducts(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
  }, [nameProduct, page, limit, varRefeshPage]);


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Products</strong> <small>(Các mặt hàng được của shop)</small>
          </CCardHeader>
          <CCardBody>
            <h3 className="text-medium-emphasis" align="center">
              Danh sách mặt hàng
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

            <Grid container mt={2} mb={1}>
              <Grid item xs={3}>
                <Button variant="contained" color="success" onClick={onBtnAddOrderClick}>Add new</Button>
              </Grid>
              <Grid item xs={9} align="right">
                <TextField
                  size="small"
                  label="Search"
                  variant="outlined"
                  onChange={(event) => { setNameProduct(event.target.value) }}
                />
              </Grid>
            </Grid>
            <CTable color="white" >
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Type</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">Buy Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col" >Promotion Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rowProducts.map((product, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>
                        <img src={product.imageUrl} width="100" />
                      </CTableDataCell>
                      <CTableDataCell>{product.name}</CTableDataCell>
                      {/* <CTableHeaderCell scope="col">{product.type}</CTableHeaderCell> */}
                      <CTableDataCell>{product.buyPrice}</CTableDataCell>
                      <CTableDataCell>{product.promotionPrice}</CTableDataCell>
                      <CTableDataCell className='text-center'>
                        <ButtonGroup variant="contained" >
                          <Button className="bg-success mx-2"  style={{width:"50%",color:"white"}} onClick={() => { onBtnEditClick(product) }}>edit</Button>
                          <Button className="bg-danger mx-2" value={index * index} onClick={() => { onBtnDeleteClick(product) }}>delete</Button>
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
          <ModalEdit setOpenModalEdit={setOpenModalEdit} openModalEdit={openModalEdit} varRefeshPage={varRefeshPage} setVarRefeshPage={setVarRefeshPage} style={style} handleCloseEdit={handleCloseEdit}  idDelete={idDelete} imageUrlProp={imageUrlProp}  fetchAPI={fetchAPI} />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Products
