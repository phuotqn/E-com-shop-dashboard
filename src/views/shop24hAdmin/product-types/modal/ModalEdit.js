import { Alert, Button, Modal, Snackbar, Typography, Box, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"
function ModalEdit({ varRefeshPage, setVarRefeshPage, style, idEdit, handleCloseEdit, setOpenModalEdit,openModalEdit, fetchAPI }) {
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModalDelete, setStatusModalEdit] = useState("error")
    const [noidungAlert, setNoidungAlert] = useState("")
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const onBtnCancelClick = () => {
        handleCloseDelete()
    }
    const onBtnConfirmEdit = () => {
        if (validate()) {
            const body = {
                method: "PUT",
                body: JSON.stringify({
                    name: name,
                    description: description,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            fetchAPI('http://localhost:8000/productTypes/' + idEdit, body)
                .then((data) => {
                    setOpenAlert(true);
                    setStatusModalEdit("success")
                    setNoidungAlert("Dữ liệu cập nhật thành công!")
                    setVarRefeshPage(varRefeshPage +1)
                    handleCloseEdit()
                    console.log(data);
                })
                .catch((err) => {
                    setOpenAlert(true);
                    setStatusModalEdit("error")
                    setNoidungAlert("Cập nhật thất bại")
                    setVarRefeshPage(varRefeshPage + 1)
                    console.log(err)
                })
        }
    }
    const onBtnCancelEdit = () => {
        handleCloseEdit()
    }
    const validate = () => {
        if (name == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa điền tên cho sản phẩm")
            return false
        }
        if (description == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa điền mô tả")
            return false
        }
        return true
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
                                <h4>Cập nhật loại sản phẩm:
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
                                            <TextField fullWidth  label="Name" className="bg-white"
                                                size="small"  onChange={(event) => setName(event.target.value)} />
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
                                            <TextField fullWidth  label="Description" className="bg-white"
                                                size="small" onChange={(event) => setDescription(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container className="mt-4 text-center">
                            <Grid item sm="12">
                                <Grid container className="mt-4">
                                    <Grid item sm="6">
                                        <Button onClick={onBtnConfirmEdit} className="bg-success w-100 text-white">Xác nhận</Button>
                                    </Grid>
                                    <Grid item sm="6">
                                        <Button onClick={onBtnCancelEdit} className="bg-danger w-75 text-white">Hủy Bỏ</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={statusModalDelete} sx={{ width: '100%' }}>
                        {noidungAlert}
                    </Alert>
                </Snackbar>
            </>
        </>
    )
}

export default ModalEdit;