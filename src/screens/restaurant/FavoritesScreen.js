import React from 'react'
import TitleBar from '../../components/ui/title-bar/TitleBar'
import FavoriteService from './FavoriteService'

function FavoritesScreen() {
  return (
    <>
      <TitleBar to="/login" title="Favorites" />
      <FavoriteService/>
    </>
  )
}

export default FavoritesScreen