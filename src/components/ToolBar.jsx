import { Input, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const Search = (props) => {
  return (
    <Input
      placeholder='🔎︎ Search ...'
      value={props.searchText}
      onChange={(e) => { props.setSearchText(e.target.value) }}
    />
  );
}

const Sort = (props) => {
  return (
    <FormControl>
      <InputLabel htmlFor="sort-order">Sort Order</InputLabel>
      <Select
        value={props.sortOrder}
        onChange={(e) => { props.setSortOrder(e.target.value) }}
        inputProps={{
          name: 'sortOrder',
          id: 'sort-order',
        }}
      >
        <MenuItem value="">
          Date Modified
        </MenuItem>
        <MenuItem value="ASC">A to Z</MenuItem>
        <MenuItem value="DESC">Z to A</MenuItem>
      </Select>
    </FormControl>
  );
}

const ToolBar = (props) => {
  return (
    <div id='toolbar'>
      <Search
        searchText={props.searchText}
        setSearchText={props.setSearchText}
      />
      <Sort
        sortOrder={props.sortOrder}
        setSortOrder={props.setSortOrder}
      />
    </div>
  );
}

export default ToolBar;












// const Search = (props) => {
//     return (
//         <input placeholder='🔎︎ Search ...' value={props.searchText}
//             onInput={(e) => { props.setSearchText(e.target.value) }}
//         />
//     )
// }

// const Sort = (props) => {
//     return (
//         <select id="myList" value={props.sortOrder}
//             onChange={(e) => { props.setSortOrder(e.target.value) }} >
//             <option value="" > Date Modified </option>
//             <option value="ASC" > A to Z </option>
//             <option value="DESC" > Z to A </option>
//         </select>
//     )
// }

// const ToolBar = (props) => {
//     return (
//         <div id='toolbar'>
//             <Search
//                 searchText={props.searchText}
//                 setSearchText={props.setSearchText}
//             />
//             <Sort
//                 sortOrder={props.sortOrder}
//                 setSortOrder={props.setSortOrder}
//             />
//         </div>
//     )
// }

// export default ToolBar;