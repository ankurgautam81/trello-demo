import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import styles from "./TaskList.module.css";
import {
    editTaskCard,
    selectTaskList,
    taskListType,
} from "./TaskList.reducers";

const TaskDetails = ({
    listIndex,
    taskIndex,
    onClose,
}: {
    listIndex: number;
    taskIndex: number;
    onClose: () => void;
}) => {
    const dispatch = useDispatch();
    const tasklist: taskListType[] = useSelector(selectTaskList);
    const taskDetails = tasklist[listIndex].tasks[taskIndex];
    const [canEditName, setCanEditName] = useState(false);

    return (
        <Dialog
            onClose={onClose}
            open={true}
            classes={{
                paper: styles.taskDetailsContainer,
            }}
        >
            <DialogTitle sx={{ px: "0px" }}>
                {canEditName ? (
                    <TextField
                        fullWidth
                        onChange={(e) =>
                            dispatch(
                                editTaskCard({
                                    listIndex,
                                    taskIndex,
                                    name: e.target.value,
                                })
                            )
                        }
                        value={taskDetails?.name}
                        placeholder="Enter title"
                    />
                ) : (
                    <Typography>
                        <strong>{taskDetails?.name}</strong>
                        <IconButton onClick={() => setCanEditName(true)}>
                            <EditIcon />
                        </IconButton>
                    </Typography>
                )}
            </DialogTitle>
            <DialogContent sx={{ px: "0px" }}>
                <TextField
                    sx={{ mb: "10px" }}
                    rows={4}
                    multiline
                    fullWidth
                    placeholder="description"
                    value={taskDetails?.description}
                    onChange={(e) =>
                        dispatch(
                            editTaskCard({
                                listIndex,
                                taskIndex,
                                description: e.target.value,
                            })
                        )
                    }
                />
                <TextField
                    fullWidth
                    type="file"
                    //@ts-ignore
                    onChange={(e) => console.log(e.target.files)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" autoFocus>
                    Save & close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDetails;
