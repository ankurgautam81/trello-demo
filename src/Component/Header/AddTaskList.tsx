import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { addTaskList } from "../TaskList/TaskList.reducers";

const AddTaskList = ({
    onClose,
    open,
}: {
    onClose: () => void;
    open: boolean;
}) => {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Add List</DialogTitle>
            <DialogContent>
                <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    sx={{ width: "300px" }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button
                    onClick={() => {
                        dispatch(addTaskList(title));
                        onClose();
                    }}
                    variant="contained"
                    autoFocus
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTaskList;
