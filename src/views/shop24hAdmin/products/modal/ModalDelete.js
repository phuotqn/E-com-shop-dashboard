import { Alert, Button, Modal, Snackbar, Typography, Box, Grid } from "@mui/material"
import { useEffect, useState } from "react";

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

        fetch("http://localhost:8000/products/" + idDelete, { method: 'DELETE' })
            // .then(async response => {
            //     const isJson = response.headers.get('content-type')?.includes('application/json');
            //     const data = isJson && await response.json();
            //     // check for error response
            //     if (!response.ok) {
            //         // get error message from body or default to response status
            //         const error = (data && data.message) || response.status;
            //         return Promise.reject(error);
            //     }
            .then((data) => {
                console.log('Delete successful');
                setOpenAlert(true)
                setStatusModalEdit("success")
                setNoidungAlert("Xóa Sản Phẩm " + idDelete + " thành công!")
                setVarRefeshPage(varRefeshPage + 1)
                handleCloseDelete()
            })
            .catch(error => {
                console.error('There was an error!', error);
                setOpenAlert(true)
                setStatusModalEdit("error")
                setNoidungAlert("Xóa Sản Phẩm " + { idDelete } + " thất bại!")
                handleCloseDelete()
            });
    }

    return (
        <>
            <Modal
                open={openModalDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-delete"
                aria-describedby="modal-delete-product"
            >
                <Box sx={style}>
                    <Typography mb={2} id="modal-modal-title" variant="h5" component="h2">
                        <b>Delete Product!</b>
                    </Typography>
                    <Grid container className="mt-2">
                        <Grid item xs={12} align="center">
                            <h4>Bạn có thật sự muốn xóa sản phẩm:
                                <h4 style={{ color: "red", marginTop: "20px" }}>{nameDelete} </h4>
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