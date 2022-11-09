
function SearchBar({searchString}) {

  function getChecked(event) {
    const searchBar = event.target.value;
    searchString(searchBar)
  }




  return (
    <div className='col justify-content-center align-self-center border-2 border-secondary '>
      <div className="input-group mb-1 border rounded-2">
        <input className="form-control text-center border-0" list="datalistOptions" id="searchedProduct" placeholder="Search..." onChange={getChecked}></input>
        <span className="input-group-text bg-white border-0"><i className='fa fa-search text-secondary'></i></span>

      </div>
    </div>
  )
}


export default SearchBar