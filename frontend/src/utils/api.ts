import axios from "axios";
import { UserData } from "@/hooks/useHomePage";

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

export async function getCategories() {
  const result = await axios.get<{id:number,name:string}[]>("/api/categories");
  console.log(result.data);
  return result.data;
}

export async function searchContents(keyword: string) {
  const result = await axios.get<ContentsType[]>(`/api/contents/search?keyword=${encodeURIComponent(keyword)}`);
  return result.data;
}

export async function getRecommendContents(user1Data: UserData, user2Data: UserData) {
  const result = await axios.get<(ContentsType&{score:number})[]>("/api/contents/recommendations?"+
    "prefer1="+ user1Data.prefer.join(",") +
    "&prefer2=" + user2Data.prefer.join(",") +
    "&dislike1=" + user1Data.dislike.join(",") +
    "&dislike2=" + user2Data.dislike.join(",") +
    "&likeContent1=" + user1Data.likeContents.map(v => v.id).join(",") +
    "&likeContent2=" + user2Data.likeContents.map(v => v.id).join(",")
  );
  return result.data;
}

export async function getContentById(netflixId: Number) {
  const foundContent = await axios.get<ContentsType>(`/api/contents/${netflixId}`);
  return foundContent.data;
}

export async function fetchAddReview(netflixId: number, review: string) {
  const result = await axios.post(`/api/reviews`, { netflixId, review });
  return result.data;
}

export async function fetchAddStarRating(netflixId: Number, star: number) {
  const result = await axios.post(`/api/rates`, { netflixId, star });
  return result.data;
}
