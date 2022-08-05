import {
    Grid,
    Alert,
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Modal,
    Select,
    Snackbar,
    Typography,
    MenuItem,
} from "@mui/material";

import { CFormInput } from '@coreui/react';

import { useState, useEffect } from 'react';

function ModalEdit({ openModalEdit, handleCloseEdit, idEdit, shippedDateEdit, style, fetchAPI, setVarRefeshPage, varRefeshPage, rowClicked }) {
    const [shippedDate, setShippedDate] = useState("");
    const [note, setNote] = useState("");

    const [count, setQuantity] = useState(0);
    const [cost, setCost] = useState(0);

    //Alert
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");

    const [orderDetail, setOrderDetail] = useState([]);

    //Select Type
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchAPI('http://localhost:8000/products')
            .then((data) => {
                setProducts(data.data)
                console.log(data.data)
            })
            .catch((error) => {
                console.error(error.message)
            })

    }, [])

    const onBtnUpdateClick = () => {
        console.log("Update được click!")
        var vCheckData = valiDate()
        if (vCheckData) {
            const body = {
                method: 'PUT',
                body: JSON.stringify({
                    shippedDate: shippedDate,
                    orderDetail: orderDetail,
                    note: note,
                    cost: cost
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI('http://localhost:8000/orders/' + idEdit, body)
                .then((data) => {
                    console.log(data);
                    setOpenAlert(true);
                    setNoidungAlertValid("Update User thành công!")
                    setStatusModal("success")
                    setVarRefeshPage(varRefeshPage + 1)
                    handleCloseEdit()
                })
                .catch((error) => {
                    console.log(error);
                    setOpenAlert(true);
                    setNoidungAlertValid("Update User thất bại!")
                    setStatusModal("error")
                    handleCloseEdit()
                })
        }
    }

    const valiDate = () => {
        if (shippedDate === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có ngày nhận hàng")
            return false
        }
        return true;
    }

    //Đóng Alert
    const handelCloseAlert = () => {
        setOpenAlert(false);
    }
    //Đóng Modal
    const onBtnCancelClick = () => {
        handleCloseEdit()
    }


    const addNewProduct = () => {
        let newOrder = {
            id: "",
            count: 1,
            price: 0
        }
        setOrderDetail([...orderDetail, newOrder])
        setQuantity(count + 1)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    function sumTotal(arr) {
        const sum = arr.reduce((index, object) => {
            return index + object.price;
        }, 0);
        return sum
    }

    function getPrice(paramId) {
        var a = [{
            promotionPrice: 0
        }];
        if (paramId) {
            a = products.filter((product, index) => {
                return product._id === paramId
            })
        }
        return a[0].promotionPrice
    }

    useEffect(() => {
        setShippedDate(shippedDateEdit);
        setNote(rowClicked.note);
        setCost(rowClicked.cost)
    }, [openModalEdit])

    useEffect(() => {
        setCost(sumTotal(orderDetail))
    }, [orderDetail])

    return (
        <>
            <Modal
                open={openModalEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "#00695c" }}>
                        <strong>Sửa danh sách khách hàng</strong>
                    </Typography>

                    <Grid container style={{ marginTop: "30px" }}>
                        <Grid item xs={6} p={2}>
                            {/* ID */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <Typography variant="h6"><b>ID</b></Typography>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <Typography variant="h6" sx={{ color: "red" }}><b>{idEdit}</b></Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Shipped Date */}
                            <Grid container mt={3}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <label>Shipped Date:</label>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <CFormInput fullWidth className="bg-white"
                                                size="small" value={shippedDate} onChange={(event) => setShippedDate(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Note */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <label>Note:</label>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <CFormInput fullWidth value={note} className="bg-white"
                                                size="small" onChange={(event) => setNote(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Tổng tiền */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <label>Tổng tiền:</label>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <CFormInput readOnly fullWidth value={numberWithCommas(cost)} Placeholder="cost" className="bg-white"
                                                size="small" onChange={(event) => setCost(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6} p={2} >
                            <Grid container align="center">
                                <Grid item xs={12} mb={2}>
                                    <Button variant="contained" onClick={addNewProduct} color="success">Chọn lại sản phẩm</Button>
                                </Grid>
                            </Grid>

                            {
                                Array.from(Array(count), (e, i) => {
                                    return (
                                        <>
                                            <Grid container mt={3}>
                                                <Grid item sm={12}>
                                                    <Grid container>
                                                        <Grid item sm={3}>
                                                            <label>Sản phẩm:</label>
                                                        </Grid>
                                                        <Grid item sm={9}>
                                                            <FormControl fullWidth size="small">
                                                                <InputLabel id="demo-simple-select-label">Chọn Sản Phẩm</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    value={orderDetail[i].id}
                                                                    label="Product"
                                                                    onChange={(event) => {
                                                                        orderDetail[i].id = event.target.value
                                                                        orderDetail[i].price = getPrice(orderDetail[i].id) * parseInt(orderDetail[i].count)
                                                                        setOrderDetail([...orderDetail])
                                                                    }}>
                                                                    <MenuItem value={"NOT"}>Chọn Sản Phẩm</MenuItem>
                                                                    {products.map((type, index) => {
                                                                        return (
                                                                            <MenuItem key={index} value={type._id}>{type.name}</MenuItem>
                                                                        )
                                                                    })}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid container mt={3}>
                                                <Grid item sm={12}>
                                                    <Grid container>
                                                        <Grid item xs={3}>Số lượng</Grid>
                                                        <Grid item xs={2}>
                                                            <CFormInput type="number" value={orderDetail[i].count}
                                                                className="bg-white" size="small"
                                                                onChange={(event) => {
                                                                    orderDetail[i].count = event.target.value;
                                                                    orderDetail[i].price = getPrice(orderDetail[i].id) * parseInt(orderDetail[i].count)
                                                                    setOrderDetail([...orderDetail])
                                                                    console.log(orderDetail)
                                                                }} />
                                                        </Grid>

                                                        <Grid item xs={1}></Grid>

                                                        <Grid item xs={5} mt={1}>
                                                            <TextField readOnly variant="standard" value={(numberWithCommas(orderDetail[i].price) )}
                                                                className="bg-white" size="small"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )
                                })
                            }

                        </Grid>
                    </Grid>

                    <Grid container className="mt-4 text-center">
                        <Grid item sm={12}>
                            <Grid container className="mt-4">
                                <Grid item sm={6}>
                                    <Button onClick={onBtnUpdateClick} className="bg-success w-75 text-white">Edit Order</Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button onClick={onBtnCancelClick} className="bg-secondary w-75 text-white">Hủy Bỏ</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal >
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handelCloseAlert}>
                <Alert onClose={handelCloseAlert} severity={statusModal} sx={{ width: '100%' }}>
                    {noidungAlertValid}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalEdit;