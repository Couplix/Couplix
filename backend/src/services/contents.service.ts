import { PrismaClient } from "@prisma/client";
import { NoResultsError, ValidationError } from "../errors";
const prisma = new PrismaClient();

export const getContents = async (id: any) => {
    if (!id || typeof id !== 'string' || isNaN(parseInt(id))) {
        throw new ValidationError();
    }

    const parsedId = parseInt(id);

    try {
        const starRateAvg = await prisma.starRating.aggregate({
            where: { netflixId: parsedId },
            _avg: { star: true }
        });

        const contents = await prisma.netflix.findUnique({
            where: {
                id: parsedId
            },
            include: {
                categories: {
                    select: {
                        name: true,
                    }
                },
                reviews: {
                    select: {
                        content: true,
                    }
                }
            }
        });

        if (!contents) {
            throw new NoResultsError();
        }

        return {
            ...contents,
            starRate: starRateAvg._avg.star ?? 0,
            reviews: contents.reviews.map(v => v.content),
            categories: contents.categories.map(v => v.name)
        };
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    } finally {
        await prisma.$disconnect();
    }
};

export const getRecommendContents = async ({ prefer1, prefer2, dislike1, dislike2, likeContent1, likeContent2 }: any) => {
    if (
        typeof prefer1 !== 'string' || typeof prefer2 !== 'string' ||
        typeof dislike1 !== 'string' || typeof dislike2 !== 'string' ||
        typeof likeContent1 !== 'string' || typeof likeContent2 !== 'string'
    ) {
        throw new ValidationError();
    }

    const parseToIntArray = (str: string) => str.split(',').filter(v => v !== "").map(v => parseInt(v));

    const prefer1Arr = parseToIntArray(prefer1);
    const prefer2Arr = parseToIntArray(prefer2);
    const dislike1Arr = parseToIntArray(dislike1);
    const dislike2Arr = parseToIntArray(dislike2);
    const likeContent1Arr = parseToIntArray(likeContent1);
    const likeContent2Arr = parseToIntArray(likeContent2);

    const commonPrefer = prefer1Arr.filter(v => prefer2Arr.includes(v));
    const commonDislike = [...new Set(dislike1Arr.concat(dislike2Arr))];
    const otherPrefer = [...new Set(prefer1Arr.concat(prefer2Arr))].filter(v => !commonPrefer.includes(v) && !commonDislike.includes(v));
    const commonLikeContent = likeContent1Arr.filter(v => likeContent2Arr.includes(v));
    const otherLikeContent = [...new Set(likeContent1Arr.concat(likeContent2Arr))].filter(v => !commonLikeContent.includes(v));

    try {
        const recommendByLikeContent = await prisma.netflix.findMany({
            select: {
                id: true,
                recommendationsOrigin: {
                    where: {
                        recommendId: {
                            in: commonLikeContent
                        }
                    }
                }
            },
            where: {
                recommendationsOrigin: {
                    some: {
                        recommendId: {
                            in: commonLikeContent
                        }
                    }
                },
                NOT: {
                    categories: {
                        some: {
                            id: {
                                in: commonDislike
                            }
                        }
                    }
                }
            },
        });

        const recommendByOtherLikeContent = await prisma.netflix.findMany({
            select: {
                id: true,
                recommendationsOrigin: {
                    where: {
                        recommendId: {
                            in: otherLikeContent
                        }
                    }
                }
            },
            where: {
                recommendationsOrigin: {
                    some: {
                        recommendId: {
                            in: otherLikeContent
                        }
                    }
                },
                NOT: {
                    categories: {
                        some: {
                            id: {
                                in: commonDislike
                            }
                        }
                    }
                }
            },
        });

        const recommendByCommonPrefer = await prisma.netflix.findMany({
            select: {
                id: true,
                _count: {
                    select: {
                        categories: {
                            where: {
                                id: {
                                    in: commonPrefer
                                }
                            }
                        }
                    }
                }
            },
            where: {
                categories: {
                    some: {
                        id: {
                            in: commonPrefer
                        }
                    }
                },
                NOT: {
                    categories: {
                        some: {
                            id: {
                                in: commonDislike
                            }
                        }
                    }
                }
            },
        });

        const recommendByOtherPrefer = await prisma.netflix.findMany({
            select: {
                id: true,
                _count: {
                    select: {
                        categories: {
                            where: {
                                id: {
                                    in: otherPrefer
                                }
                            }
                        }
                    }
                }
            },
            where: {
                categories: {
                    some: {
                        id: {
                            in: otherPrefer
                        }
                    }
                },
                NOT: {
                    categories: {
                        some: {
                            id: {
                                in: commonDislike
                            }
                        }
                    }
                }
            },
        });

        const allRecommend = [...new Set([
            ...recommendByLikeContent.map(v => v.id),
            ...recommendByOtherLikeContent.map(v => v.id),
            ...recommendByCommonPrefer.map(v => v.id),
            ...recommendByOtherPrefer.map(v => v.id)
        ])].filter(v => !commonLikeContent.includes(v) && !otherLikeContent.includes(v));

        const recommendContents = await prisma.netflix.findMany({
            where: {
                id: {
                    in: allRecommend
                }
            },
            include: {
                categories: {
                    select: {
                        name: true,
                    }
                },
            }
        });

        const allRecommendWithScore = recommendContents.map(v => {
            const likeContentScore = recommendByLikeContent.find(recommend => recommend.id === v.id)?.recommendationsOrigin.reduce((acc, cur) => acc + (cur.similarity - 0.5) * 30, 0) ?? 0;
            const otherLikeContentScore = recommendByOtherLikeContent.find(recommend => recommend.id === v.id)?.recommendationsOrigin.reduce((acc, cur) => acc + (cur.similarity - 0.5) * 10, 0) ?? 0;
            const commonPreferScore = recommendByCommonPrefer.find(recommend => recommend.id === v.id)?._count.categories ?? 0;
            const otherPreferScore = (recommendByOtherPrefer.find(recommend => recommend.id === v.id)?._count.categories ?? 0) * 0.5;
            return {
                ...v,
                categories: v.categories.map(v => v.name),
                score: likeContentScore + otherLikeContentScore + commonPreferScore + otherPreferScore
            }
        });

        return allRecommendWithScore.sort((a, b) => b.score - a.score).filter((v, i) => i < 100);
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    } finally {
        await prisma.$disconnect();
    }
};

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

export async function getSearch(keyword: any): Promise<ContentsType[]> {
    console.log('Received keyword in service:', keyword);  // 로그 추가
    if (!keyword || typeof keyword !== 'string') {
        throw new ValidationError();
    }

    const normalizedKeyword = keyword.toLowerCase();

    try {
        const movies = await prisma.netflix.findMany({
            where: {
                OR: [
                    { title: { contains: normalizedKeyword } },
                    { director: { contains: normalizedKeyword } },
                    { cast: { contains: normalizedKeyword } },
                ],
            },
            include: {
                starRating: true,
                categories: true,
                reviews: true,
            },
        });

        if (movies.length === 0) {
            throw new NoResultsError();
        }

        const results: ContentsType[] = movies.map(movie => {
            const averageStarRating = movie.starRating.length > 0
                ? movie.starRating.reduce((acc, rating) => acc + rating.star, 0) / movie.starRating.length
                : 0;

            return {
                id: movie.id,
                title: movie.title,
                director: movie.director.split(','),
                cast: movie.cast.split(','),
                country: movie.country,
                release_year: parseInt(movie.release_year, 10),
                rating: movie.rating,
                duration: movie.duration,
                categories: movie.categories.map(category => category.name),
                description: movie.description,
                starRate: averageStarRating,
                reviews: movie.reviews.map(review => review.content),
            };
        });

        return results;

    } catch (error) {
        if (error instanceof NoResultsError || error instanceof ValidationError) {
            throw error;
        } else {
            console.error(error);
            throw new Error("Internal Server Error");
        }
    } finally {
        await prisma.$disconnect();
    }
}