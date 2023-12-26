import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";

const initialState: initialStateType = {
    taskList: [],
};

const reducers = {
    setTaskList(
        state: typeof initialState,
        { payload }: { payload: taskListType[] }
    ) {
        state.taskList = payload;
        localStorage.setItem("taskList", JSON.stringify(payload));
    },
    addTaskList(state: typeof initialState, { payload }: { payload: string }) {
        const taskList = state.taskList;
        const list = {
            name: payload,
            tasks: [],
        };
        taskList.push(list);
        // state.taskList = taskList;
        localStorage.setItem("taskList", JSON.stringify(taskList));
    },
    addCard(
        state: typeof initialState,
        { payload }: { payload: { index: number; name: string } }
    ) {
        const taskList = state.taskList;
        taskList[payload.index].tasks.push({
            name: payload.name,
            description: "",
            deadline: "",
        });
        localStorage.setItem("taskList", JSON.stringify(taskList));
    },
    editTaskCard(
        state: typeof initialState,
        {
            payload,
        }: {
            payload: {
                listIndex: number;
                taskIndex: number;
                name?: string;
                description?: string;
                deadline?: string;
            };
        }
    ) {
        const { listIndex, taskIndex, name, description, deadline } = payload;
        const taskList = state.taskList;
        let task = taskList[listIndex].tasks[taskIndex];
        taskList[listIndex].tasks[taskIndex] = {
            name: name || task.name,
            description: description || task.description,
            deadline: deadline || task.deadline,
        };
        localStorage.setItem("taskList", JSON.stringify(taskList));
    },

    deleteTaskCard(
        state: typeof initialState,
        {
            payload,
        }: {
            payload: {
                listIndex: number;
                taskIndex: number;
            };
        }
    ) {
        const { listIndex, taskIndex } = payload;
        const taskList = state.taskList;
        taskList[listIndex].tasks.splice(taskIndex, 1);
        localStorage.setItem("taskList", JSON.stringify(taskList));
    },
};

export const page = createSlice({
    name: "taskList",
    initialState,
    reducers,
});

export default page.reducer;

export const {
    setTaskList,
    addTaskList,
    addCard,
    editTaskCard,
    deleteTaskCard,
} = page.actions;

export const selectTaskList = (state: RootState) => state.taskList.taskList;

type initialStateType = {
    taskList: taskListType[];
};

export type taskListType = {
    name: string;
    tasks: task[];
};

export type task = {
    name: string;
    description: string;
    deadline: string;
    favorite?: boolean;
};
