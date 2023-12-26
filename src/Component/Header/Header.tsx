import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AppBar, Button, Container, Toolbar } from "@mui/material";

import AddTaskList from "./AddTaskList";

const Header = () => {
    const [showAddListDialog, setShowAddListDialog] = useState(false);

    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        src="https://trello.com/assets/d947df93bc055849898e.gif"
                        style={{ width: "70px" }}
                    />
                    <Button
                        sx={{
                            my: 2,
                            color: "white",
                            marginLeft: "10px",
                        }}
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setShowAddListDialog(true)}
                    >
                        Add List
                    </Button>
                </Toolbar>
                {showAddListDialog && (
                    <AddTaskList
                        onClose={() => setShowAddListDialog(false)}
                        open={showAddListDialog}
                    />
                )}
            </Container>
        </AppBar>
    );
};

export default Header;
