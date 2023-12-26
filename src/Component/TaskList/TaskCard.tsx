import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Button, IconButton, Popover, Stack, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import TaskDetails from "./TaskDetails";
import {
    deleteTaskCard,
    selectTaskList,
    setTaskList,
    task,
} from "./TaskList.reducers";

const TaskCard = ({
    data,
    listIndex,
    taskIndex,
}: {
    data: any;
    listIndex: number;
    taskIndex: number;
}) => {
    const dispatch = useDispatch();
    const tasklist = useSelector(selectTaskList);
    const [showCardDetails, setShowCardDetails] = useState(false);
    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(
            deleteTaskCard({
                listIndex,
                taskIndex,
            })
        );
    };

    const markFavorite = (
        e: React.MouseEvent<HTMLButtonElement>,
        favorite: boolean
    ) => {
        e.stopPropagation();
        const newTasklist = JSON.parse(JSON.stringify(tasklist));
        if (!newTasklist[listIndex]?.tasks?.length) return;
        newTasklist[listIndex].tasks[taskIndex].favorite = favorite;
        newTasklist[listIndex].tasks.sort((a: task, b: task) =>
            a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1
        );
        dispatch(setTaskList(newTasklist));
    };

    return (
        <>
            <Button
                variant="outlined"
                sx={{
                    backgroundColor: "#fff",
                    mb: "10px",
                    justifyContent: "space-between",
                }}
                onClick={() => setShowCardDetails(true)}
                fullWidth
            >
                {data.name}
                <Stack direction="row">
                    {data.favorite ? (
                        <IconButton
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                                markFavorite(e, false)
                            }
                        >
                            <StarIcon color="warning" />
                        </IconButton>
                    ) : (
                        <Tooltip title="mark favorite">
                            <IconButton
                                onClick={(
                                    e: React.MouseEvent<HTMLButtonElement>
                                ) => markFavorite(e, true)}
                            >
                                <StarBorderIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <DeletePopover onDelete={onDelete} />
                </Stack>
            </Button>
            {showCardDetails && (
                <TaskDetails
                    listIndex={listIndex}
                    taskIndex={taskIndex}
                    onClose={() => setShowCardDetails(false)}
                />
            )}
        </>
    );
};

const DeletePopover = ({ onDelete }: { onDelete: Function }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e: any) => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <IconButton aria-describedby={id} onClick={handleClick}>
                <DeleteIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Button
                    sx={{ p: 2, color: "red" }}
                    onClick={(e) => onDelete(e)}
                >
                    Delete
                </Button>
            </Popover>
        </div>
    );
};

export default TaskCard;
