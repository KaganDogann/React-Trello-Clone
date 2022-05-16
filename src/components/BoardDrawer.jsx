import { Divider, Drawer, List, ListItem } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import React, { useState } from "react";

export default function BoardDrawer({ handleDrawerMenuFalse }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleDrawerOpen = () => {};

  const handleDrawerFalse = () => {
    handleDrawerMenuFalse();
    setIsOpen(false);
  };

  return (
    <div onBlur={() => handleDrawerFalse()}>
      <React.Fragment key={"left"}>
        <Drawer open={isOpen}>
          <div role="presentation">
            <List>
              <ListItem>
                <ListItemText>Trello Clone</ListItemText>
              </ListItem>
              <ListItem>
                <p>You can see source codes and repository in my github</p>
              </ListItem>
              <ListItem>
                <p> github.com/KaganDogann </p>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem style={{ position: "absolute", top: "500px" }}>
                <ListItemText>Developed by Kağan Doğan</ListItemText>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
