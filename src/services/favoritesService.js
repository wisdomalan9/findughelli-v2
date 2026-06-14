export const getFavorites = () => {

  const favorites =
    localStorage.getItem(
      "favorites"
    )

  return favorites
    ? JSON.parse(favorites)
    : []

}

export const saveFavorite = (
  vendor
) => {

  const favorites =
    getFavorites()

  const exists =
    favorites.find(
      (item) =>
        item.id === vendor.id
    )

  if (!exists) {

    const updatedFavorites = [
      ...favorites,
      vendor,
    ]

    localStorage.setItem(
      "favorites",
      JSON.stringify(
        updatedFavorites
      )
    )

  }

}

export const removeFavorite = (
  vendorId
) => {

  const favorites =
    getFavorites()

  const updatedFavorites =
    favorites.filter(
      (item) =>
        item.id !== vendorId
    )

  localStorage.setItem(
    "favorites",
    JSON.stringify(
      updatedFavorites
    )
  )

}
