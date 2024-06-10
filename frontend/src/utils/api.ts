import axios from "axios";
export type ContentsType = {
  id: number;
  title: string;
  director: string[];
  cast: string[];
  country: string;
  release_year: number;
  rating: string;
  duration: string;
  categories: string[];
  description: string;
  starRate: number;
  reviews: string[];
};

export let contents: ContentsType[] = [
  {
    id: 1,
    title: "어벤져스",
    director: ["조스 웨던"],
    cast: ["로버트 다우니 주니어", "크리스 에반스", "마크 러팔로", "크리스 헴스워스", "스칼렛 요한슨", "제레미 레너", "톰 히들스턴", "새뮤얼 L. 잭슨"],
    release_year: 2012,
    description: "ASSEMBLE! 최강의 슈퍼히어로들이 모였다!지구의 운명을 건 거대한 전쟁이 시작된다!지구의 안보가 위협당하는 위기의 상황에서 슈퍼히어로들을 불러모아 세상을 구하는, 일명 [어벤져스] 작전. 에너지원 ‘큐브’를 이용한 적의 등장으로 인류가 위험에 처하자 국제평화유지기구인 쉴드 (S.H.I.E.L.D)의 국장 닉 퓨리(사무엘 L.잭슨)는 [어벤져스] 작전을 위해 전 세계에 흩어져 있던 슈퍼히어로들을 찾아나선다. 아이언맨(로버트 다우니 주니어)부터 토르(크리스 헴스워스), 헐크(마크 러팔로), 캡틴 아메리카(크리스 에반스)는 물론, 쉴드의 요원인 블랙 위도우(스칼렛 요한슨), 호크 아이(제레미 레너)까지, 최고의 슈퍼히어로들이 [어벤져스]의 멤버로 모이게 되지만, 각기 개성이 강한 이들의 만남은 예상치 못한 방향으로 흘러가는데… 지구의 운명을 건 거대한 전쟁 앞에 [어벤져스] 작전은 성공할 수 있을까?",
    starRate: 4.5,
    country: "미국",
    rating: "12세 이상",
    duration: "143분",
    categories: ["슈퍼히어로", "SF", "액션", "어드벤처", "판타지"],
    reviews: ["재밌다", "재밌네요"]
  },
]

export async function getCategories() {
  const result = await axios.get<{id:number,name:string}[]>("/api/categories");
  console.log(result.data);
  return result.data;
}

export async function searchContents(keyword: string) {
  /*return [
    
    { id: 1, title: "어벤져스", category: "액션, 드라마", releaseYear: 2012, rating: "12세 이상", starRating: 4.5 },
    { id: 2, title: "어벤져스2", category: "액션, 드라마", releaseYear: 2015, rating: "12세 이상", starRating: 4.0 },
    { id: 3, title: "어벤져스3", category: "액션, 드라마", releaseYear: 2018, rating: "12세 이상", starRating: 4.5 },
  ]*/
  return contents;
}

export async function getContentById(contentId: Number) {
  const foundContent = await axios.get<ContentsType>(`/api/contents/${contentId}`);
  return foundContent.data;
}

export async function fetchAddReview(contentId: Number, review: string) {
  const foundContent = contents.find(content => content.id === contentId);
}

export async function fetchAddStarRating(contentId: Number, rating: number) {
  const foundContent = contents.find(content => content.id === contentId);
  return foundContent!.starRate;
}
