// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Request, Response } from 'express';
import { GetNewsFeed } from '../utils/newsfeed';
import { checkNewsTickers, getCategoriesWithTickers, getUniqueTickers } from '../utils/utils';



const NewsFeedStatsHandler = (logger: any) => async (req: Request, res: Response) => {

  const news = await GetNewsFeed();
  checkNewsTickers(news, logger)
  const tickers = getUniqueTickers(news, logger)
  const categories = getCategoriesWithTickers(news, logger)

  // console.log(news)
  // most popoular category
  const mostPopular = categories.byPopularity.length ? categories.byPopularity[0] : ["not found", 0, 0]
  // most popular category without a ticker
  const noTickerByCategory = categories.noTickerByCategory.length ? categories.noTickerByCategory[0] : ["not found", 0, 0]
  const byCategorySomeNoTicker = categories.byCategorySomeNoTicker.length ? categories.byCategorySomeNoTicker[0] : ["not found", 0, 0]

  res.json({
    uniqueTickers: tickers.length,
    mostPopularCategory: mostPopular[0],
    mostPopularCategoryWithoutTickers: noTickerByCategory[0],
    mostPopularCategoryWithourMissingSomeTickers: byCategorySomeNoTicker[0],
  });

};
export default NewsFeedStatsHandler


