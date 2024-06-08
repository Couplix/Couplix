export async function getCategories() {
  return [
    { id: 1, name: "액션" },
    { id: 2, name: "드라마" },
    { id: 3, name: "호러" },
    { id: 4, name: "코미디" },
    { id: 5, name: "로맨스" },
    { id: 6, name: "SF" },
    { id: 7, name: "판타지" },
    { id: 8, name: "애니메이션" },
    { id: 9, name: "다큐멘터리" },
    { id: 10, name: "스릴러" },
    { id: 11, name: "모험" },
    { id: 12, name: "범죄" },
    { id: 13, name: "미스터리" },
    { id: 14, name: "전쟁" },
    { id: 15, name: "판타지" },
  ]
}

export async function searchContents(keyword: string) {
  return [
    { id: 1, title: "어벤져스", category: "액션, 드라마", releaseYear: 2012, rating: "12세 이상", starRating: 4.5 },
    { id: 2, title: "어벤져스2", category: "액션, 드라마", releaseYear: 2015, rating: "12세 이상", starRating: 4.0 },
    { id: 3, title: "어벤져스3", category: "액션, 드라마", releaseYear: 2018, rating: "12세 이상", starRating: 4.5 },
  ]
}
