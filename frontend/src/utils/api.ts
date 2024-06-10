export type ContentsType = {
  id: number;
  title: string;
  director: string[];
  cast: string[];
  country: string;
  releaseYear: number;
  rating: string;
  duration: string;
  categories: string[];
  description: string;
  starRating: number;
  reviews: {
    id: number,
    text: string
  }[];
};

export let contents: ContentsType[] = [
  {
    id: 1,
    title: "어벤져스",
    director: ["조스 웨던"],
    cast: ["로버트 다우니 주니어", "크리스 에반스", "마크 러팔로", "크리스 헴스워스", "스칼렛 요한슨", "제레미 레너", "톰 히들스턴", "새뮤얼 L. 잭슨"],
    releaseYear: 2012,
    description: "ASSEMBLE! 최강의 슈퍼히어로들이 모였다!지구의 운명을 건 거대한 전쟁이 시작된다!지구의 안보가 위협당하는 위기의 상황에서 슈퍼히어로들을 불러모아 세상을 구하는, 일명 [어벤져스] 작전. 에너지원 ‘큐브’를 이용한 적의 등장으로 인류가 위험에 처하자 국제평화유지기구인 쉴드 (S.H.I.E.L.D)의 국장 닉 퓨리(사무엘 L.잭슨)는 [어벤져스] 작전을 위해 전 세계에 흩어져 있던 슈퍼히어로들을 찾아나선다. 아이언맨(로버트 다우니 주니어)부터 토르(크리스 헴스워스), 헐크(마크 러팔로), 캡틴 아메리카(크리스 에반스)는 물론, 쉴드의 요원인 블랙 위도우(스칼렛 요한슨), 호크 아이(제레미 레너)까지, 최고의 슈퍼히어로들이 [어벤져스]의 멤버로 모이게 되지만, 각기 개성이 강한 이들의 만남은 예상치 못한 방향으로 흘러가는데… 지구의 운명을 건 거대한 전쟁 앞에 [어벤져스] 작전은 성공할 수 있을까?",
    starRating: 4.5,
    country: "미국",
    rating: "12세 이상",
    duration: "143분",
    categories: ["슈퍼히어로", "SF", "액션", "어드벤처", "판타지"],
    reviews: [{id: 1, text: "재밌다"}, {id: 2, text: "재밌네요"}]
  },
  {
    id: 2,
    title: "어벤져스2",
    director: ["조스 웨던"],
    cast: ["로버트 다우니 주니어", "크리스 헴스워스", "마크 러팔로", "크리스 에반스", "스칼렛 요한슨", "제러미 레너", "제임스 스페이더", "새뮤얼 L. 잭슨"],
    releaseYear: 2015,
    description: "쉴드의 숙적 히드라는 연구를 통해 새로운 능력자 막시모프 남매를 탄생시키고, 히드라의 기지를 공격하는 도중 토니 스타크는 완다 막시모프의 초능력으로 인해 자신이 가장 두려워하는 미래를 보게 된다. 이에 '뉴욕전쟁' 때와 같은 사태가 벌어지지 않도록 스타크는 배너 박사와 함께 지구를 지킬 최강의 인공지능 울트론을 탄생시키게 되지만, 울트론은 예상과 다르게 지배를 벗어나 폭주하기 시작하는데...",
    starRating: 5.0,
    country: "미국",
    rating: "12세 이상",
    duration: "141분",
    categories: ["슈퍼히어로", "SF", "액션", "어드벤처"],
    reviews: [{id: 1, text: "재밌다"}, {id: 2, text: "재밌네요"}]
  },
  {
    id: 3,
    title: "어벤져스3",
    director: ["앤서니 루소", "조 루소"],
    cast: ["로버트 다우니 주니어", "크리스 헴스워스", "마크 러팔로", "크리스 에반스", "스칼렛 요한슨",
    "베네딕트 컴버배치", "돈 치들", "톰 홀랜드", "채드윅 보스만", "폴 베타니", "엘리자베스 올슨", "앤서니 매키",
    "세바스찬 스탠", "다나이 구리라", "레티티아 라이트", "톰 홀랜드", "데이브 바티스타", "조 샐다나",
    "조시 브롤린", "크리스 프랫"],
    releaseYear: 2018,
    description: "가디언즈 오브 갤럭시 멤버들과 와칸다 군대, 닥터 스트레인지 등 새로운 팀들과 함께 환상의 대연합을 이룬 어벤져스, 역대 최강 빌런 타노스에 맞서 전 우주에 운명이 걸린 인피니티 스톤을 향한 무한 대결이 펼쳐진다! 마블의 클라이맥스를 목격하라!",
    starRating: 4.5,
    country: "미국",
    rating: "12세 이상",
    duration: "149분",
    categories: ["슈퍼히어로", "SF", "액션", "어드벤처", "판타지", "드라마"],
    reviews: [{id: 1, text: "재밌다"}, {id: 2, text: "재밌네요"}]
  }
]

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
  /*return [
    
    { id: 1, title: "어벤져스", category: "액션, 드라마", releaseYear: 2012, rating: "12세 이상", starRating: 4.5 },
    { id: 2, title: "어벤져스2", category: "액션, 드라마", releaseYear: 2015, rating: "12세 이상", starRating: 4.0 },
    { id: 3, title: "어벤져스3", category: "액션, 드라마", releaseYear: 2018, rating: "12세 이상", starRating: 4.5 },
  ]*/
  return contents;
}

export async function getContentById(contentId: Number) {
  const foundContent = contents.find(content => content.id === contentId);
  return foundContent!;
}

export async function fetchAddReview(contentId: Number, review: string) {
  const foundContent = contents.find(content => content.id === contentId);
  foundContent!.reviews.push({id: foundContent!.reviews.length + 1, text: review});
}

export async function fetchAddStarRating(contentId: Number, rating: number) {
  const foundContent = contents.find(content => content.id === contentId);
  foundContent!.starRating = (foundContent!.starRating + rating)/2;
  return foundContent!.starRating;
}
