import React, { useEffect } from "react";

import logo from "./logo.svg";

import "./App.css";

import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import Header from "./Component/Header/Header";
import TaskList from "./Component/TaskList/TaskList";
import { setTaskList } from "./Component/TaskList/TaskList.reducers";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const taskList = localStorage.getItem("taskList") || "";
        console.log("taskList", taskList);
        dispatch(setTaskList(taskList ? JSON.parse(taskList) : []));
    }, []);

    return (
        <Stack className="app-container" height="100%">
            <Header />
            <TaskList />
        </Stack>
    );
}

export default App;
