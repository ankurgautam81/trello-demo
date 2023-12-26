import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import {
    Button,
    IconButton,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

import TaskCard from "./TaskCard";
import styles from "./TaskList.module.css";
import {
    addCard,
    selectTaskList,
    setTaskList,
    task,
} from "./TaskList.reducers";

const TaskList = () => {
    const dispatch = useDispatch();
    const tasklist = useSelector(selectTaskList);
    const [dragStartListIndex, setDragStartListIndex] = useState(-1);
    const [dragStartTaskIndex, setDragStartTaskIndex] = useState(-1);
    const [addNewCard, setAddNewCard] = useState({
        canShow: false,
        name: "",
        listIndex: 0,
    });

    const addACard = (index: number) => {
        if (!addNewCard.name) return;
        dispatch(addCard({ index, name: addNewCard.name }));
        setAddNewCard({
            canShow: false,
            name: "",
            listIndex: 0,
        });
    };

    const onSort = (index: number) => {
        const newTasklist = JSON.parse(JSON.stringify(tasklist));
        if (!newTasklist[index]?.tasks?.length) return;
        newTasklist[index].tasks.sort((a: task, b: task) =>
            a.name.localeCompare(b.name)
        );

        newTasklist[index].tasks.sort((a: task, b: task) =>
            a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1
        );

        dispatch(setTaskList(newTasklist));
    };

    const onDrop = (dropIndex: number) => {
        const newTasklist = JSON.parse(JSON.stringify(tasklist));
        const task = newTasklist[dragStartListIndex].tasks[dragStartTaskIndex];
        newTasklist[dropIndex].tasks.push(task);
        newTasklist[dragStartListIndex].tasks.splice(dragStartTaskIndex, 1);
        newTasklist[dropIndex].tasks.sort((a: task, b: task) =>
            a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1
        );
        dispatch(setTaskList(newTasklist));
    };

    return (
        <Stack
            flexDirection="row"
            height="90%"
            justifyContent={!tasklist.length ? "center" : ""}
        >
            {tasklist.map((item, i) => {
                const { name, tasks } = item;

                return (
                    <Stack className={styles.taskListContainer} key={i}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ py: "10px" }}>
                                <strong>{name}</strong>
                            </Typography>
                            <Tooltip title="Sort">
                                <IconButton onClick={() => onSort(i)}>
                                    <VerticalAlignBottomIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Stack
                            onDrop={() => onDrop(i)}
                            onDragOver={(e) => e.preventDefault()}
                            minHeight={
                                addNewCard.canShow && addNewCard.listIndex === i
                                    ? "0px"
                                    : "50px"
                            }
                        >
                            {tasks.map((data, j) => (
                                <div
                                    draggable
                                    onDragStart={(e) => {
                                        setDragStartListIndex(i);
                                        setDragStartTaskIndex(j);
                                    }}
                                >
                                    <TaskCard
                                        data={data}
                                        listIndex={i}
                                        taskIndex={j}
                                        key={j}
                                    />
                                </div>
                            ))}
                        </Stack>
                        {/* </div> */}
                        {addNewCard.canShow && addNewCard.listIndex === i && (
                            <Stack
                                sx={{
                                    backgroundColor: "#fff",
                                    mb: "10px",
                                    p: "10px",
                                }}
                            >
                                <TextField
                                    value={addNewCard.name}
                                    size="small"
                                    placeholder="Enter card name"
                                    onChange={(e) =>
                                        setAddNewCard({
                                            canShow: true,
                                            name: e.target.value,
                                            listIndex: i,
                                        })
                                    }
                                />
                                <Stack direction="row" mt="10px">
                                    <Button
                                        variant="contained"
                                        onClick={() => addACard(i)}
                                    >
                                        Add card
                                    </Button>
                                    <IconButton
                                        onClick={() =>
                                            setAddNewCard({
                                                canShow: false,
                                                name: "",
                                                listIndex: 0,
                                            })
                                        }
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        )}
                        <Button
                            onClick={() =>
                                setAddNewCard({
                                    canShow: true,
                                    name: "",
                                    listIndex: i,
                                })
                            }
                        >
                            Add a card
                        </Button>
                    </Stack>
                );
            })}
            {!tasklist.length && (
                <Stack justifyContent="center" alignContent="center">
                    <Typography>
                        Oop's seems you dont have any task list, Create new task
                        list by clicking button Add list
                    </Typography>
                </Stack>
            )}
        </Stack>
    );
};

export default TaskList;
