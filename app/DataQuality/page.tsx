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

  const [characters, updateCharacters] = useState(modules);
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
  const ToggleDialog = () => {
    setFlowDialog((prev) => {
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <div
              className="modules-wrapper"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2>PROSOL MODULES</h2>
              {characters.map((data: moduleProps, index) => {
                return (
                  <Draggable draggableId={data.id} key={data.id} index={index}>
                    {(provided) => (
                      <div
                        className="single-module-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span>{data.content}</span>
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
    </div>
  );
};

export default DataQuality;
