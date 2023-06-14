import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Option {
  name: string;
  value: string;
}

interface DropdownData {
  id: string; // Add an id property for unique identification
  name: string;
  placeholder: string;
  type: "single" | "multiple";
  required: boolean;
  options: Option[];
}

const jsonData: DropdownData[] = [
  // JSON data remains the same as before
];

const SelectDropdown: React.FC<DropdownData & { index: number }> = ({
  id,
  name,
  placeholder,
  type,
  required,
  options,
  index,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOptions(
      Array.isArray(event.target.value) ? event.target.value : []
    );
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <FormControl variant="outlined" required={required}>
            <InputLabel>{placeholder}</InputLabel>
            <Select
              multiple={type === "multiple"}
              value={selectedOptions}
              onChange={handleChange}
              label={placeholder}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{placeholder}</FormHelperText>
          </FormControl>
        </div>
      )}
    </Draggable>
  );
};

const App: React.FC = () => {
  const [dropdownData, setDropdownData] = useState<DropdownData[]>(jsonData);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(dropdownData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDropdownData(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="dropdowns">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {dropdownData.map((data, index) => (
              <SelectDropdown key={data.id} {...data} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
