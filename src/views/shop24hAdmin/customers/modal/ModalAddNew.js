import {
    Container,
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
    MenuItem
} from "@mui/material";
import { useState, useEffect } from 'react';

function ModalAddNew({ openModalAdd, setOpenModalAdd, handleClose, style, fetchAPI, setVarRefeshPage, varRefeshPage }) {

    const [fullName, setFullName] = useState("");
    const [phone, setphone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

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
                    country: country
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI('http://localhost:8000/customers/', body)
                .then((data) => {
                    setOpenAlert(true);
                    setStatusModal("success")
                    setNoidungAlertValid("Dữ liệu thêm thành công!")
                    setOpenModalAdd(false)
                    setVarRefeshPage(varRefeshPage + 1);
                    console.log(data);
                    // window.location.reload();
                })
                .catch((error) => {
                    setOpenAlert(true);
                    setStatusModal("error")
                    setNoidungAlertValid("Dữ liệu thêm thất bại!");
                    console.log(error.message);
                })
        }

    }

    //Validate
    const valiDate = () => {
        if (fullName == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa đặt tên cho sản phẩm")
            return false
        }
        if (phone === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có mô tả cho sản phẩm")
            return false
        }
        if (email === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa chọn loại sản phẩm")
            return false
        }

        if (address === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có giá sản phẩm")
            return false
        }
        if (city === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có giá mới sản phẩm")
            return false
        }
        if (country === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có số lượng sản phẩm")
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
        handleClose()
    }

    return (
        <>
            <Modal
                open={openModalAdd}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-phone"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "black" }}>
                        <strong>Thêm Khách Hàng</strong>
                    </Typography>

                    <Grid container style={{ marginTop: "50px" }}>
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Full Name:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField fullWidth label="Full Name" className="bg-white"
                                            size="small" value={fullName} onChange={(event) => setFullName(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Phone:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField fullWidth value={phone} label="Phone" className="bg-white"
                                            size="small" onChange={(event) => setphone(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Email:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField fullWidth value={email} label="Email" className="bg-white"
                                            size="small" onChange={(event) => setEmail(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Address:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField fullWidth value={address} label="Address" className="bg-white"
                                            size="small" onChange={(event) => setAddress(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>City:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField fullWidth value={city} label="City" className="bg-white"
                                            size="small" onChange={(event) => setCity(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Country:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField fullWidth value={country} label="Country" className="bg-white"
                                            size="small" onChange={(event) => setCountry(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container className="mt-4 text-center">
                        <Grid item sm={12}>
                            <Grid container className="mt-4">
                                <Grid item sm={6}>
                                    <Button onClick={onBtnInsertClick} className="bg-success w-75 text-white">Create Customer</Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button onClick={onBtnCancelClick} className="bg-danger w-75 text-white">Hủy Bỏ</Button>
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