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

function ModalEdit({ setOpenModalEdit,openModalEdit, setVarRefeshPage, style, handleCloseEdit, idDelete, fetchAPI,varRefeshPage,imageUrlProp }) {
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [buyPrice, setBuyPrice] = useState("");
    const [promotionPrice, setPromotionPrice] = useState("");
    const [types, setTypes] = useState([]);
    const handelCloseAlert = () => {
        setOpenAlert(false);
    }

    //Đóng Modal
    const onBtnCancelClick = () => {
        handleCloseEdit()
    }
    const valiDate = () => {
        if (name == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa điền tên cho sản phẩm")
            return false
        }
        if (buyPrice === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa cập nhật giá sản phẩm")
            return false
        }
        if (promotionPrice === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa cập nhật giá khuyến mãi mới của sản phẩm")
            return false
        }
        return true;
    }

    const onBtnEditClick = () => {
        if (valiDate()) {
            console.log("Cập nhật sản phẩm: " + idDelete)
            const body = {
                method: "PUT",
                body: JSON.stringify({
                    name: name,
                    buyPrice: buyPrice,
                    promotionPrice: promotionPrice,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI('http://localhost:8000/products/' + idDelete, body)
                .then((data) => {
                    setOpenAlert(true);
                    setStatusModal("success")
                    setNoidungAlertValid("Dữ cập nhật thành công!")
                    setOpenModalEdit(false)
                    setVarRefeshPage(varRefeshPage + 1);
                    console.log(data);
                })
                .catch((error) => {
                    setOpenAlert(true);
                    setStatusModal("error")
                    setNoidungAlertValid("Dữ liệu cập nhật thất bại!");
                    console.log(error.message);
                })
        }
    }
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
                        <strong>Cập nhật sản phẩm</strong>
                    </Typography>

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
                                        <label>Image Url:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField fullWidth value={imageUrlProp} label="Image Url" className="bg-white" id="outlined-read-only-input"
                                            size="small"InputProps={{
                                                readOnly: true,
                                              }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Buy Price:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField type="number" fullWidth value={buyPrice} label="Buy Price" className="bg-white"
                                            size="small" onChange={(event) => setBuyPrice(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Promotion Price:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField type="number" fullWidth value={promotionPrice} label="Promotion Price" className="bg-white"
                                            size="small" onChange={(event) => setPromotionPrice(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid container className="mt-4 text-center">
                        <Grid item sm={12}>
                            <Grid container className="mt-4">
                                <Grid item sm={6}>
                                    <Button onClick={onBtnEditClick} className="bg-success w-75 text-white">Edit Product</Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button className="bg-danger w-75 text-white" onClick = {onBtnCancelClick}>Hủy Bỏ</Button>
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