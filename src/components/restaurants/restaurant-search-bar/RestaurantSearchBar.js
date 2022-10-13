
function SearchBar({restaurants, setRestaurants}) {
  
  function getChecked() {
    const searchBar = document.getElementById('searchedProduct').value;
    if (searchBar !== ''){
          const searchedList = restaurants.filter((x) =>  x.name.includes(searchBar))
          setRestaurants(searchedList)
    } else {
      setRestaurants(restaurants)
    }
  }

  // function getCheckedStock () {
  //   const onStock = document.getElementById('restaurantsOnStock').checked;

  //   console.log(onStock)
  //   if (onStock === true){
  //     const onStockList = restaurants.filter((x) => x.inStock !== false)
  //     setRestaurants(onStockList)
  //   } else {
  //     setRestaurants(restaurants)
  //   }
  //   }

  return (
    <div className='col justify-content-center align-self-center '>
      <label htmlFor="searchedProduct" className="form-label">Search</label>
      <input className="form-control" list="datalistOptions" id="searchedProduct" placeholder="Type to search..." onChange={getChecked}></input>
      <div className="form-check form-check-inline flex-column mt-3">
        <label className="form-check-label" htmlFor="restaurantsOnStock">
          Only Show restaurants in Stock
        </label>
      </div>
    </div>
  )
}


export default SearchBar