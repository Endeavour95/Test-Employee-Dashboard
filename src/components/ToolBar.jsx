
const Search = (props) => {
    return (
        <input placeholder='🔎︎ Search ...' onInput={(e) => { props.setSearchText(e.target.value) }} />
    )
}

const Sort = (props) => {
    return (
        <select id="myList" value={props.sortOrder} onChange={(e) => { props.setSortOrder(e.target.value) }} >
            <option value="" > Date Modified </option>
            <option value="ASC" > A to Z </option>
            <option value="DESC" > Z to A </option>
        </select>
    )
}

const ToolBar = (props) => {
    return (
        <div id='toolbar'>
            <Search setSearchText={props.setSearchText} />
            <Sort setSortOrder={props.setSortOrder} sortOrder={props.sortOrder} />
        </div>
    )
}

export default ToolBar;