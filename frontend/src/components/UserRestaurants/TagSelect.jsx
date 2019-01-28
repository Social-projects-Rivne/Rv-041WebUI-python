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

const TagSelect = props => {
  const { allTags, onTagsChange, tags } = props;

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
        {allTags.map(tag => (
          <MenuItem key={tag.id} value={tag.name}>
            <Checkbox checked={tags.indexOf(tag.name) > -1} />
            <ListItemText primary={tag.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

TagSelect.porpTypes = {
  allTags: PropTypes.array.isRequired,
  onTagsChange: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired.isRequired
};

export default TagSelect;
