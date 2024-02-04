
const Search = (props) => {
    return (
        <input placeholder='🔎︎ Search ...' value={props.searchText}
            onInput={(e) => { props.setSearchText(e.target.value) }}
        />
    )
}

const Sort = (props) => {
    return (
        <select id="myList" value={props.sortOrder}
            onChange={(e) => { props.setSortOrder(e.target.value) }} >
            <option value="" > Date Modified </option>
            <option value="ASC" > A to Z </option>
            <option value="DESC" > Z to A </option>
        </select>
    )
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
    )
}

export default ToolBar;