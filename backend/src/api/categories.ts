import { Router, Request, Response } from 'express';

const router = Router();

const categories = [
  "Action & Adventure",
  "Anime Features",
  "Anime Series",
  "British TV Shows",
  "Children & Family Movies",
  "Classic & Cult TV",
  "Classic Movies",
  "Comedies",
  "Crime TV Shows",
  "Cult Movies",
  "Documentaries",
  "Docuseries",
  "Dramas",
  "Faith & Spirituality",
  "Horror Movies",
  "Independent Movies",
  "International Movies",
  "International TV Shows",
  "Kids' TV",
  "Korean TV Shows",
  "LGBTQ Movies",
  "Movies",
  "Music & Musicals",
  "Reality TV",
  "Romantic Movies",
  "Romantic TV Shows",
  "Science & Nature TV",
  "Sci-Fi & Fantasy",
  "Spanish-Language TV Shows",
  "Sports Movies",
  "Stand-Up Comedy",
  "Stand-Up Comedy & Talk Shows",
  "Teen TV Shows",
  "Thrillers",
  "TV Action & Adventure",
  "TV Comedies",
  "TV Dramas",
  "TV Horror",
  "TV Mysteries",
  "TV Sci-Fi & Fantasy",
  "TV Shows",
  "TV Thrillers"
];

router.get('/', (req: Request, res: Response) => {
  const formattedCategories = categories.map((category, index) => ({
    categoryId: index + 1,
    name: category
  }));
  
  res.json(formattedCategories);
});

export default router;
