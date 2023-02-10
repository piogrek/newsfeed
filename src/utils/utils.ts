import { Categories, CategoryStats, NewsItem, NewsStats, Tickers } from "../types";


export function checkNewsTickers(news: NewsItem[], logger: any) {
    news.map(news => {
        if (!news.ticker) {
            logger.error(`Ticker not set for news "${news.title}"`);
        }
    })
}

export function getUniqueTickers(news: NewsItem[], logger: any): (string | number)[][] {
    let tickers: Tickers = {}

    news.map(news => {

        if (news.ticker) {
            if (!tickers[news.ticker]) {
                tickers[news.ticker] = 0
            }
            tickers[news.ticker]++
        }

    })

    // convert to array
    let sortable: [string, number][] = [];
    for (var ticker in tickers) {
        sortable.push([ticker, tickers[ticker]]);
    }

    // sort descending by number of tickers
    return sortable.sort(function (a, b) {
        return b[1] - a[1];
    });
}

export function getCategoriesWithTickers(news: NewsItem[], logger: any): CategoryStats {
    let categories: Categories = {}

    news.map(news => {
        const regex = /.*\/smw-category\/([a-z]+).*/g;
        const categoryMatch = news["smw category"].matchAll(regex);
        const result = categoryMatch.next()
        // get only category name from link tag
        let category = result.value[1]

        // get uniquer category list and gather ticker/popularity stats
        if (category) {
            if (!categories[category]) {
                // init category key
                categories[category] = { tickers: 0, noTickers: 0, count: 0 }
            }

            if (news.ticker) {
                categories[category].tickers++
            } else {
                categories[category].noTickers++
            }
            //popularity
            categories[category].count++

        }
    })

    // convert to array
    let sortable: [string, number, number][] = [];
    for (var cat in categories) {
        sortable.push([cat, categories[cat].count, categories[cat].noTickers]);
    }

    // sort descending by number of tickers
    // first filter out any with tickers, then sort by popularity
    const noTickerByCategory = sortable.filter(a => a[2] === 0).sort((a, b) => a[2] - b[2]);
    // sort descending by popularity, then descending by number of no-tickers
    const byCategorySomeNoTicker = sortable.filter(a => a[2] > 0).sort((a, b) => b[1] - a[1] || b[2] - a[2]);
    const byPopularity = sortable.sort((a, b) => b[1] - a[1]);


    return { noTickerByCategory, byCategorySomeNoTicker, byPopularity }

}
