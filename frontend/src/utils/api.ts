export async function getCategories() {
  return [
    { id: 1, name: "액션" },
    { id: 2, name: "드라마" },
    { id: 3, name: "호러" },
  ]
}

export async function searchConents(keyword: string) {
  return [
    { id: 1, title: "어벤져스", categoryId: 1 },
    { id: 2, title: "어벤져스2", categoryId: 1 },
    { id: 3, title: "어벤져스3", categoryId: 1 },
  ]
}
