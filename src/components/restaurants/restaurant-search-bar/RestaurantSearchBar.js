
function SearchBar({restaurants, setRestaurants}) {
  
  function getChecked() {
    const searchBar = document.getElementById('searchedProduct').value;
    if (searchBar !== ''){
      
      searchBar.toLowerCase()
      const searchedList = restaurants.filter((restaurant) => {
        
            const names = restaurant.name.toLowerCase()
            
            return names.includes(searchBar)
          })
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
    <div className='col justify-content-center align-self-center border-2 border-secondary '>
      <div className="input-group mb-1 border rounded-2">
        <input className="form-control text-center border-0" list="datalistOptions" id="searchedProduct" placeholder="Search..." onChange={getChecked}></input>
        <span className="input-group-text bg-white border-0"><i className='fa fa-search text-secondary'></i></span>

      </div>

      {/* <div className="form-check form-check-inline flex-column mt-3">
        <label className="form-check-label" htmlFor="restaurantsOnStock">
          Only Show restaurants in Stock
        </label>
      </div> */}
    </div>
  )
}


export default SearchBar