import React from 'react'
import TitleBar from '../../../components/ui/title-bar/TitleBar'
import MyFavorites from './MyFavorites'

function FavoritesScreen() {
  return (
    <>
      <TitleBar to="/account" title="Favorites" />
      <MyFavorites/>
    </>
  )
}

export default FavoritesScreen