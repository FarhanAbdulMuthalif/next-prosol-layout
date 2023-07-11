import { MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
interface DropdownData {
  setDynFldData: (prev: any) => void;
  name: string;
  options: string[];
}
const SelectMulti: React.FC<DropdownData> = ({
  setDynFldData,
  options,
  name,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<unknown[]>([]);

  const handleChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    setSelectedOptions(
      Array.isArray(event.target.value) ? event.target.value : []
    );
    setDynFldData((prev: any) => {
      return {
        ...prev,
        [event.target.name]: Array.isArray(event.target.value)
          ? event.target.value
          : [],
      };
    });
  };

  return (
    <Select
      value={selectedOptions as any}
      onChange={handleChange}
      sx={{ fontSize: "12px", color: "brown" }}
      name={name}
      multiple
      fullWidth
      displayEmpty
      style={{
        height: 40,

        alignSelf: "flex-start",
      }}
      renderValue={(selected) => {
        if (selectedOptions.length === 0) {
          return "Select an option";
        }
        return Array.isArray(selected) ? (selected as string[]).join(", ") : [];
      }}
      // renderValue={(value) =>
      //   Array.isArray(value) && value.length > 0
      //     ? value.join(", ")
      //     : "Select Field"
      // }
    >
      {options.map((option) => (
        <MenuItem
          sx={{ fontSize: "12px", color: "#5E5873" }}
          key={option}
          value={option}
        >
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};
export default SelectMulti;
