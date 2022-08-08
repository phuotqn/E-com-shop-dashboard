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

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [imageUrl, setImageUrl] = useState("");
    const [buyPrice, setBuyPrice] = useState("");
    const [promotionPrice, setPromotionPrice] = useState("");


    //Alert
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");

    //Select Type
    const [productTypes, setProductTypes] = useState([])

    useEffect(() => {
        fetchAPI('http://localhost:8000/producttypes')
            .then((data) => {
                setProductTypes(data.data)
                console.log(data.data)
            })
            .catch((error) => {
                console.error(error.message)
            })
    }, [])


    //BTN ADD NEW
    const onBtnInsertClick = () => {
        if (valiDate()) {
            const body = {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    description: description,
                    imageUrl: imageUrl,
                    buyPrice: buyPrice,
                    promotionPrice: promotionPrice,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI('http://localhost:8000/products', body)
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
        if (name == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa đặt tên cho sản phẩm")
            return false
        }
        if (description === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có mô tả cho sản phẩm")
            return false
        }
        if (imageUrl.indexOf(".") === -1) {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("ImageUrl không hợp lệ")
            return false
        }
        if (buyPrice === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có giá sản phẩm")
            return false
        }
        if (promotionPrice === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có giá mới sản phẩm")
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
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "black" }}>
                        <strong>Thêm Sản Phẩm</strong>
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
                                        <label>Description:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField fullWidth value={description} label="Description" className="bg-white"
                                            size="small" onChange={(event) => setDescription(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>ImageUrl:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField fullWidth value={imageUrl} label="ImageUrl" className="bg-white"
                                            size="small" onChange={(event) => setImageUrl(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>BuyPrice:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField type="number" fullWidth value={buyPrice} label="BuyPrice" className="bg-white"
                                            size="small" onChange={(event) => setBuyPrice(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>PromotionPrice:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <TextField type="number" fullWidth value={promotionPrice} label="PromotionPrice" className="bg-white"
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
                                    <Button onClick={onBtnInsertClick} className="bg-success w-75 text-white">Create Product</Button>
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