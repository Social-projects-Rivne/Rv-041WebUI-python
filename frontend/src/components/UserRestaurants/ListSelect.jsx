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
  const { list, onListChange, selectedItems } = props;

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="tags">Tags</InputLabel>
      <Select
        multiple
        value={tags}
        onChange={onTagsChange}
        input={<Input id="tags" name="tags" />}
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
    </FormControl>
  );
};

ListSelect.porpTypes = {
  allTags: PropTypes.array.isRequired,
  onTagsChange: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired.isRequired
};

export default ListSelect;
