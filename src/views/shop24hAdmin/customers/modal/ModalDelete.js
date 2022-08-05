import { Alert, Button, Modal, Snackbar, Typography, Box, Grid } from "@mui/material"
import { useState } from "react";

function ModalDelete({ openModalDelete, idDelete, nameDelete, handleCloseDelete, style, setVarRefeshPage, varRefeshPage }) {
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModalDelete, setStatusModalEdit] = useState("error")
    const [noidungAlert, setNoidungAlert] = useState("")

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const onBtnCancelClick = () => {
        handleCloseDelete()
    }

    const onBtnConfirmDeleteClick = () => {
        console.log("%cXác nhận xóa được click!", "color:red");

        fetch("http://localhost:8000/customers/" + idDelete, { method: 'DELETE' })
            .then((data) => {
                console.log('Delete successful');
                setOpenAlert(true)
                setStatusModalEdit("success")
                setNoidungAlert("Xóa Khách Hàng " + idDelete + " thành công!")
                setVarRefeshPage(varRefeshPage + 1)
                handleCloseDelete()
            })
            .catch(error => {
                console.error('There was an error!', error);
                setOpenAlert(true)
                setStatusModalEdit("error")
                setNoidungAlert("Xóa Khách Hàng " + { idDelete } + " thất bại!")
                handleCloseDelete()
            });
    }

    return (
        <>
            <Modal
                open={openModalDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-delete"
                aria-describedby="modal-delete-customer"
            >
                <Box sx={style}>
                    <Typography mb={2} id="modal-modal-title" variant="h5" component="h2">
                        <b>Delete Customers!</b>
                    </Typography>
                    <Grid container className="mt-2">
                        <Grid item xs={12} align="center">
                            <h4>Bạn có thật sự muốn xóa khách hàng có tên:
                                <h4 style={{ color: "red", marginTop: "20px" }}>{nameDelete} ? </h4>
                            </h4>
                        </Grid>
                    </Grid>
                    <Grid container className="mt-4 text-center">
                        <Grid item sm="12">
                            <Grid container className="mt-4">
                                <Grid item sm="6">
                                    <Button onClick={onBtnConfirmDeleteClick} className="bg-danger w-100 text-white">Xác nhận</Button>
                                </Grid>
                                <Grid item sm="6">
                                    <Button onClick={onBtnCancelClick} className="bg-secondary w-75 text-white">Hủy Bỏ</Button>
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
    )
}

export default ModalDelete