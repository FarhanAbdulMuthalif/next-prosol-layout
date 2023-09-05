"use client";
import React, { useState } from "react";
import "./style.scss";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { IconButton, Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FlowDialogComp from "../components/Dialog/FlowDialogComp";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import RoleCreationDialog from "../components/Dialog/RoleCreationDialog";
import EditIcon from "@mui/icons-material/Edit";
type moduleProps = {
  id: string;
  content: string;
};
const DataQuality = () => {
  const modules: moduleProps[] = [
    { id: "1", content: "Requester" },
    { id: "2", content: "Approver" },
    { id: "3", content: "Cataloguer" },
    { id: "4", content: "Reviewer" },
    { id: "5", content: "Releaser" },
  ];
  const formList: moduleProps[] = [
    { id: "1", content: "Requester" },
    { id: "2", content: "Approver" },
    { id: "3", content: "Cataloguer" },
    { id: "4", content: "PV" },
    { id: "5", content: "MRP Data" },
  ];

  const [characters, updateCharacters] = useState(modules);
  const [DynamicFormList, updateDynamicFormList] = useState(formList);
  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  function handleModuleDrop(moduleId: string) {
    const updatedModules = characters.filter(
      (module) => module.id !== moduleId
    );
    updateCharacters(updatedModules);
  }
  const [FlowDialog, setFlowDialog] = useState({ display: false, content: "" });
  const [RoleDialog, setRoleDialog] = useState({
    display: false,
    content: [
      "Super admin",
      "Admin",
      "Requester",
      "Approver",
      "Cataloguer",
      "Reviewer",
      "Releaser",
    ],
  });
  const ToggleDialog = () => {
    setFlowDialog((prev) => {
      return { ...prev, display: prev.display === true ? false : true };
    });
  };
  const ToggleRoleDialog = () => {
    setRoleDialog((prev) => {
      return { ...prev, display: prev.display === true ? false : true };
    });
  };
  function DialogHandler(data: moduleProps) {
    setFlowDialog((prev) => {
      return { content: data.content, display: true };
    });
  }
  return (
    <div className="section-dtqty">
      <section>
        <div className="modules-wrapper-creation">
          <h3>DYNAMIC FORMS CREATION</h3>
          {DynamicFormList.map((data: moduleProps, index) => {
            return (
              <div className="single-module-card" key={data.content}>
                {/* <span className="span-index">{index + 1}</span> */}
                <span className="span-text">{data.content} Form</span>
                <EditIcon sx={{ fontSize: "16px", color: "#0000ff91" }} />
              </div>
            );
          })}

          <Button startIcon={<AddIcon />} sx={{ alignSelf: "flex-end" }}>
            Add new
          </Button>
        </div>
        <div className="role-wrapper">
          <h2>PROSOL ROLES</h2>
          <div className="display-role-chip">
            {RoleDialog?.content.map((data: string) => {
              return (
                <p key={data}>
                  {data}{" "}
                  <EditIcon
                    sx={{
                      fontSize: "16px",
                      color: "#0000ff91",
                    }}
                  />
                </p>
              );
            })}
          </div>
          <Button
            startIcon={<AddIcon />}
            sx={{
              alignSelf: "flex-end",
            }}
            onClick={ToggleRoleDialog}
          >
            Add new
          </Button>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <div
                className="modules-wrapper"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2>WORKFLOW SETUP</h2>
                {characters.map((data: moduleProps, index) => {
                  return (
                    <Draggable
                      draggableId={data.id}
                      key={data.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="single-module-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {/* <span className="span-index">{index + 1}</span> */}
                          <span className="span-text">{data.content}</span>
                          <DragIndicatorIcon
                            sx={{ fontSize: "24px", color: "#0000ff91" }}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided?.placeholder}
                <Button startIcon={<AddIcon />} sx={{ alignSelf: "flex-end" }}>
                  Add new
                </Button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
      {/* <div className="flow-wrapper">
        <div className="flow-card"> </div>
        <div className="flow-card"></div>
        <div className="flow-card"></div>
        <div className="flow-card"></div>
        <div className="flow-card"></div>
      </div> */}

      <div className="flow-wrapper">
        {characters.map((data, index) => (
          <div
            className="flow-card"
            key={data.id}
            onDrop={() => handleModuleDrop(data.id)}
            onDragOver={(e) => e.preventDefault()}
          >
            <IconButton
              className="setting-flow-icon"
              onClick={() => {
                DialogHandler(data);
              }}
            >
              <SettingsIcon sx={{ fontSize: "14px" }} />
            </IconButton>
            {index === 0 ? (
              <p className="initial-txt-modules">Initial module</p>
            ) : (
              ""
            )}
            {index === characters.length - 1 ? (
              <p className="end-txt-modules">End module</p>
            ) : null}

            <span>{data.content}</span>
          </div>
        ))}
      </div>
      <FlowDialogComp
        open={FlowDialog.display}
        handleClose={ToggleDialog}
        handleOk={ToggleDialog}
        content={FlowDialog.content}
      />
      <RoleCreationDialog
        content={RoleDialog.content}
        open={RoleDialog.display}
        handleClose={ToggleRoleDialog}
        handleOk={ToggleRoleDialog}
      />
    </div>
  );
};

export default DataQuality;
