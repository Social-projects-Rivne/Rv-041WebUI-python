import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Radio,
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
  const { list, onListChange, selectedItems, name, radio } = props;

  return (
    <Select
      multiple={!radio}
      value={selectedItems}
      onChange={onListChange}
      input={<Input id={name} name={name} />}
      renderValue={selected =>
        radio ? selected.toString() : selected.join(", ")
      }
      MenuProps={MenuProps}
    >
      {list.map(listItem => (
        <MenuItem key={listItem.id} value={listItem.name}>
          {radio ? (
            <Radio checked={selectedItems.indexOf(listItem.name) > -1} />
          ) : (
            <Checkbox checked={selectedItems.indexOf(listItem.name) > -1} />
          )}
          <ListItemText primary={listItem.name} />
        </MenuItem>
      ))}
    </Select>
  );
};

ListSelect.defaultProps = {
  radio: false
};

ListSelect.porpTypes = {
  list: PropTypes.array.isRequired,
  onListChange: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  name: PropTypes.string,
  radio: PropTypes.bool
};

export default ListSelect;
