export async function getCategories() {
  return [
    { id: 1, name: "액션" },
    { id: 2, name: "드라마" },
    { id: 3, name: "호러" },
  ]
}

export async function searchConents(keyword: string) {
  return [
    { id: 1, title: "어벤져스", category: "액션, 드라마",releaseYear: 2012, rating: 4.5 },
    { id: 2, title: "어벤져스2", category: "액션, 드라마",releaseYear: 2015, rating: 4.0 },
    { id: 3, title: "어벤져스3", category: "액션, 드라마",releaseYear: 2018, rating: 4.5 },
  ]
}
