import { Input, Select, MenuItem, InputLabel, FormControl, TextField, Paper } from '@mui/material';

const Search = (props) => {
  return (
    <TextField
      sx={{ m: 1, minWidth: 120 }} size="small"
      id="outlined-basic" label="🔎︎ Search ..." variant="outlined"
      // placeholder='🔎︎ Search ...'
      value={props.searchText}
      onChange={(e) => { props.setSearchText(e.target.value) }}
    />
  );
}

const Sort = (props) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Sort</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        label="Sort"
        value={props.sortOrder}
        onChange={(e) => { props.setSortOrder(e.target.value) }}
      >
        <MenuItem value="">Date Modified</MenuItem>
        <MenuItem value="ASC">A to Z</MenuItem>
        <MenuItem value="DESC">Z to A</MenuItem>
      </Select>
    </FormControl>
  );
}

const ToolBar = (props) => {
  return (
    <>
      {/* <Paper elevation={3}> */}
        <Search
          searchText={props.searchText}
          setSearchText={props.setSearchText}
        />
        <Sort
          sortOrder={props.sortOrder}
          setSortOrder={props.setSortOrder}
        />
      {/* </Paper> */}
    </>
  );
}

export default ToolBar;