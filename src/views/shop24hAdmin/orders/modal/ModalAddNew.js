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



function ModalAddNew({ openModalAdd, setOpenModalAdd, handleClose, style, fetchAPI, setVarRefeshPage, varRefeshPage }) {

    const [fullName, setFullName] = useState("");
    const [phone, setphone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");


    const [shippedDate, setShippedDate] = useState("");
    const [note, setNote] = useState("");
    const [orderDetail, setOrderDetail] = useState([
        {
            id: "",
            count: 1,
            price: 0
        }
    ]);
    const [count, setCount] = useState(1);
    const [cost, setCost] = useState(0);

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


    //Alert
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");


    //BTN ADD NEW
    const onBtnInsertClick = () => {
        if (valiDate()) {
            const body = {
                method: 'POST',
                body: JSON.stringify({
                    fullName: fullName,
                    phone: phone,
                    email: email,
                    address: address,
                    city: city,
                    country: country,
                    shippedDate: shippedDate,
                    note: note,
                    orderDetail: orderDetail,
                    cost: cost,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI("http://localhost:8000/customers/phone/", body)
                .then((data) => {
                    setOpenAlert(true);
                    setStatusModal("success")
                    setNoidungAlertValid("D??? li???u th??m th??nh c??ng!")
                    setOpenModalAdd(false)
                    setVarRefeshPage(varRefeshPage + 1);
                    console.log(data);
                    // window.location.reload();
                })
                .catch((error) => {
                    setOpenAlert(true);
                    setStatusModal("error")
                    setNoidungAlertValid("D??? li???u th??m th???t b???i!");
                    console.log(error.message);
                })
        }

    }

    //Validate
    const valiDate = () => {
        if (fullName == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Ch??a nh???p t??n kh??ch h??ng")
            return false
        }
        if (phone === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Ch??a nh???p s??? ??i???n tho???i")
            return false
        }

        const vREG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!vREG.test(String(email))) {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Email kh??ch h??ng kh??ng h???p l???")
            return false
        }

        if (address === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Ch??a nh???p ?????a ch???")
            return false
        }
        if (city === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Ch??a nh???p th??nh ph???")
            return false
        }
        if (country === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Ch??a nh???p qu???c gia")
            return false
        }

        if (shippedDate === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Ch??a c?? ng??y nh???n h??ng")
            return false
        }
        if (true) {
            let a = true
            orderDetail.map((e, i) => {
                if (e.id === "") {
                    setOpenAlert(true);
                    setStatusModal("error")
                    setNoidungAlertValid("Ch??a sa??n ph????m")
                    a = false
                }
                if (e.count < 1) {
                    setOpenAlert(true);
                    setStatusModal("error")
                    setNoidungAlertValid("S???? l??????ng kh??ng h????p l????")
                    a = false
                }
            })
            return a
        }
        return true;
    }


    //????ng Alert
    const handelCloseAlert = () => {
        setOpenAlert(false);
    }

    //????ng Modal
    const onBtnCancelClick = () => {
        handleClose()
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
        setCost(sumTotal(orderDetail))
    }, [orderDetail])


    return (
        <>
            <Modal
                open={openModalAdd}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "black" }}>
                        <strong>Th??m S???n Ph???m</strong>
                    </Typography>

                    <Grid container style={{ marginTop: "50px" }}>
                        {/* CUSTOMER  */}
                        <Grid item xs={6} p={2}>
                            {/* Full Name */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Full Name:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth placeholder="Full Name"
                                                value={fullName} onChange={(event) => setFullName(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Phone */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>phone:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth placeholder="Phone" className="bg-white"
                                                value={phone} size="small" onChange={(event) => setphone(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Email */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Email:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth value={email} Placeholder="Email" className="bg-white"
                                                size="small" onChange={(event) => setEmail(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Address */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Address:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth value={address} Placeholder="Address" className="bg-white"
                                                size="small" onChange={(event) => setAddress(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* City */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>City:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth value={city} Placeholder="City" className="bg-white"
                                                size="small" onChange={(event) => setCity(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Country */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Country:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth value={country} Placeholder="Country" className="bg-white"
                                                size="small" onChange={(event) => setCountry(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* ORDER */}
                        <Grid item xs={6} p={2}>

                            {
                                Array.from(Array(count), (e, i) => {
                                    return (
                                        <>
                                            <Grid container mt={2}>
                                                <Grid item sm={12}>
                                                    <Grid container>
                                                        <Grid item sm={4}>
                                                            <label>S???n ph???m:</label>
                                                        </Grid>
                                                        <Grid item sm={8}>
                                                            <FormControl fullWidth size="small">
                                                                <InputLabel id="demo-simple-select-label">Ch???n S???n Ph???m</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    value={orderDetail[i].id}
                                                                    label="Product"
                                                                    onChange={(event) => {
                                                                        orderDetail[i].id = event.target.value
                                                                        orderDetail[i].price = getPrice(orderDetail[i].id) * parseInt(orderDetail[i].count)
                                                                        setOrderDetail([...orderDetail])
                                                                    }}>
                                                                    <MenuItem value={"NOT"}>Ch???n S???n Ph???m</MenuItem>
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

                                            <Grid container mt={2} mb={5}>
                                                <Grid item sm={12}>
                                                    <Grid container>
                                                        <Grid item xs={4}>S??? l?????ng</Grid>
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
                                                            <TextField disabled variant="standard" value={(numberWithCommas(orderDetail[i].price))}
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

                            {/* Shipped Date */}
                            <Grid container mt={4}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>ShippedDate:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput type="date" fullWidth value={shippedDate} className="bg-white"
                                                size="small" onChange={(event) => setShippedDate(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Note */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Note:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth value={note} Placeholder="Note" className="bg-white"
                                                size="small" onChange={(event) => setNote(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* T???ng ti???n */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>T???ng ti???n:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput readOnly fullWidth value={numberWithCommas(cost)  } Placeholder="cost" className="bg-white"
                                                size="small" onChange={(event) => setCost(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid container className="mt-4 text-center">
                        <Grid item sm={12}>
                            <Grid container className="mt-4">
                                <Grid item sm={6}>
                                    <Button onClick={onBtnInsertClick} className="bg-success w-75 text-white">Create Order</Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button onClick={onBtnCancelClick} className="bg-danger w-75 text-white">H???y B???</Button>
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
export default ModalAddNew;