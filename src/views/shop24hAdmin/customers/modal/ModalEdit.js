import { Alert, Button, Modal, Snackbar, Typography, Box, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"

function ModalEdit({ varRefeshPage, setVarRefeshPage, style, idEdit, handleCloseEdit, openModalEdit, fetchAPI,setOpenModalEdit }) {

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }
    const [noidungAlert, setNoidungAlert] = useState("")
    const [statusModal, setStatusModal] = useState("error");
    const [openAlert, setOpenAlert] = useState(false)
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [country,setCountry] = useState("");
    const [address,setAddress] = useState("")
    const [city,setCity] = useState("");

    const valiDate = () => {
        if (name == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlert("Chưa điền tên")
            return false
        }
        if (email == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlert("Chưa điền email")
            return false
        }
        if (phone == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlert("Chưa điền số điện thoại")
            return false
        }
        if (address == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlert("Chưa điền quốc gia")
            return false
        }
        if (country == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlert("Chưa điền thành phố")
            return false
        }
        if (city == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlert("Chưa điền quốc gia")
            return false
        }
        return true
    }
    const onBtnConfirmEdit = () => {
        if(valiDate) {
            const body = {
                method: 'PUT',
                body: JSON.stringify({
                    fullName: name,
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
            fetchAPI('http://localhost:8000/customers/'+ idEdit, body)
                .then((data) => {
                    setOpenAlert(true);
                    setStatusModal("success")
                    setNoidungAlert("Dữ liệu cập nhật thành công!")
                    setOpenModalEdit(false)
                    setVarRefeshPage(varRefeshPage +1);
                    console.log(data);
                    // window.location.reload();
                })
                .catch((error) => {
                    setOpenAlert(true);
                    setStatusModal("error")
                    setNoidungAlert("Dữ liệu cập nhật thất bại!");
                    console.log(error.message);
                })
        }
    }

   
    return (
        <>
            <>
                <Modal
                    open={openModalEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-delete"
                    aria-describedby="modal-delete-product"
                >
                    <Box sx={style}>
                        <Grid container className="mt-2">
                            <Grid item xs={12} align="center">
                                <h4>Cập nhật thông tin người dùng:
                                    <h4 style={{ color: "red", marginTop: "20px" }}> </h4>
                                </h4>
                            </Grid>
                        </Grid>

                        <Grid container style={{ marginTop: "50px" }}>
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <label>Name:</label>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <TextField fullWidth label="Name" className="bg-white"
                                                size="small" value={name} onChange={(event) => setName(event.target.value)} />
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
                                            <TextField fullWidth label="Email" className="bg-white"
                                                size="small" value={email} onChange={(event) => setEmail(event.target.value)} />
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
                                            <TextField fullWidth label="Phone" className="bg-white"
                                                size="small" value={phone} onChange={(event) => setPhone(event.target.value)} />
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
                                            <TextField fullWidth label="Address" className="bg-white"
                                                size="small" value={address} onChange={(event) => setAddress(event.target.value)} />
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
                                            <TextField fullWidth label="Country" className="bg-white"
                                                size="small" value={country} onChange={(event) => setCountry(event.target.value)} />
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
                                            <TextField fullWidth label="City" className="bg-white"
                                                size="small" value={city} onChange={(event) => setCity(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container className="mt-4 text-center">
                            <Grid item sm="12">
                                <Grid container className="mt-4">
                                    <Grid item sm="6">
                                        <Button onClick= {onBtnConfirmEdit} className="bg-success w-100 text-white">Xác nhận</Button>
                                    </Grid>
                                    <Grid item sm="6">
                                        <Button onClick = {() => {handleCloseEdit()}} className="bg-danger w-75 text-white">Hủy Bỏ</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={statusModal}  sx={{ width: '100%' }}>
                        {noidungAlert}
                    </Alert>
                </Snackbar>
            </>
        </>

    )
}

export default ModalEdit