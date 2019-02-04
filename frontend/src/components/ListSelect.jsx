import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Input
} from "@material-ui/core";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250
    }
  }
};

const ListSelect = props => {
  const { list, onListChange, selectedItems, name } = props;

  return (
    <Select
      multiple
      value={selectedItems}
      onChange={onListChange}
      input={<Input id={name} name={name} />}
      renderValue={selected => selected.join(", ")}
      MenuProps={MenuProps}
    >
      {list.map(listItem => (
        <MenuItem key={listItem.id} value={listItem.name}>
          <Checkbox checked={selectedItems.indexOf(listItem.name) > -1} />
          <ListItemText primary={listItem.name} />
        </MenuItem>
      ))}
    </Select>
  );
};

ListSelect.porpTypes = {
  list: PropTypes.array.isRequired,
  onListChange: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  name: PropTypes.string
};

export default ListSelect;
