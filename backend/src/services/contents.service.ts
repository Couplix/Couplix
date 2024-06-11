import { PrismaClient } from "@prisma/client";
import { NoResultsError, ValidationError } from "../errors";
const prisma = new PrismaClient();

export const getContents = async (id: any) => {
    if (!id || typeof id !== 'string' || typeof parseInt(id) !== 'number') {
        throw new ValidationError();
    }
    const starRateAvg = await prisma.starRating.aggregate({
        where: { netflixId: parseInt(id) },
        _avg: { star: true }
      });

    const contents =  await prisma.netflix.findUnique({
        where: {
            id: parseInt(id)
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

    if(!contents) {
        throw new NoResultsError();
    }

    return {
        ...contents,
        starRate : starRateAvg._avg.star??0,
        reviews: contents.reviews.map(v => v.content),
        categories: contents.categories.map(v => v.name)
    };
}

export const getRecommendContents = async ({prefer1, prefer2, dislike1, dislike2, likeContent1, likeContent2}: any) => {
    if(typeof prefer1 !== 'string' || typeof prefer2 !== 'string' || typeof dislike1 !== 'string' || typeof dislike2 !== 'string' || typeof likeContent1 !== 'string' || typeof likeContent2 !== 'string') {
        throw new ValidationError();
    }

    const prefer2Arr = prefer2.split(',').filter(v=>v!="").map(v => parseInt(v));
    const prefer1Arr = prefer1.split(',').filter(v=>v!="").map(v => parseInt(v));
    const dislike1Arr = dislike1.split(',').filter(v=>v!="").map(v => parseInt(v));
    const dislike2Arr = dislike2.split(',').filter(v=>v!="").map(v => parseInt(v));
    const likeContent1Arr = likeContent1.split(',').filter(v=>v!="").map(v => parseInt(v));
    const likeContent2Arr = likeContent2.split(',').filter(v=>v!="").map(v => parseInt(v));

    const commonPrefer = prefer1Arr.filter(v => prefer2Arr.includes(v));
    const commonDislike = [ ...new Set(dislike1Arr.concat(dislike2Arr))];
    const otherPrefer = [ ...new Set(prefer1Arr.concat(prefer2Arr))].filter(v => !commonPrefer.includes(v) && !commonDislike.includes(v));
    const commonLikeContent = likeContent1Arr.filter(v => likeContent2Arr.includes(v));
    const otherLikeContent = [ ...new Set(likeContent1Arr.concat(likeContent2Arr))].filter(v => !commonLikeContent.includes(v));

    console.log(commonPrefer, commonDislike, otherPrefer, commonLikeContent, otherLikeContent);

    const recommendByLikeContent = await prisma.netflix.findMany({
        select: {
            id: true,
            recommendationsOrigin:{
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
            recommendationsOrigin:{
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
                    categories:{
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
                    categories:{
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

    const allRecommend = [ ...new Set([...recommendByLikeContent.map(v => v.id),
        ...recommendByOtherLikeContent.map(v => v.id),
        ...recommendByCommonPrefer.map(v => v.id),
        ...recommendByOtherPrefer.map(v => v.id)])];
    
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
        const likeContentScore = recommendByLikeContent.find(recommend => recommend.id === v.id)?.recommendationsOrigin.reduce((acc, cur) => acc + (cur.similarity-0.5)*30, 0)??0;
        const otherLikeContentScore = recommendByOtherLikeContent.find(recommend => recommend.id === v.id)?.recommendationsOrigin.reduce((acc, cur) => acc + (cur.similarity-0.5)*10, 0)??0;
        const commonPreferScore = recommendByCommonPrefer.find(recommend => recommend.id === v.id)?._count.categories??0;
        const otherPreferScore = (recommendByOtherPrefer.find(recommend => recommend.id === v.id)?._count.categories??0)*0.5;
        return {
            ...v,
            score: likeContentScore + otherLikeContentScore + commonPreferScore + otherPreferScore
        }
    });

    return allRecommendWithScore.sort((a, b) => b.score - a.score);
}
