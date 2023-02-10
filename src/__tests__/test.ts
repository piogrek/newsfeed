import { NewsItem } from "../types"
import { checkNewsTickers, getCategoriesWithTickers, getUniqueTickers } from "../utils/utils"

describe('testing util methods', () => {
    // data:
    // 1 all filled
    const data: NewsItem[] = [{
        "title": "news1",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat1\">CAT1</a>",
        "ticker": "ticker1",
        "type": "Article"
    }, {
        "title": "news2",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat1\">CAT1</a>",
        "ticker": "ticker2",
        "type": "Article"
    }, {
        "title": "news3 no ticker cat1",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat1\">CAT1</a>",
        "ticker": "ticker2",
        "type": "Article"
    }, {
        "title": "news3a  ticker cat1",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat1\">CAT1</a>",
        "ticker": "ticker2",
        "type": "Article"
    }, {
        "title": "news3b  ticker cat1",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat1\">CAT1</a>",
        "ticker": "ticker2",
        "type": "Article"
    }, {
        "title": "news3b  ticker cat1",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat1\">CAT1</a>",
        "ticker": "ticker2",
        "type": "Article"
    }, {
        "title": "news4 no ticker cat2",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat2\">CAT2</a>",
        "ticker": null,
        "type": "Article"
    }, {
        "title": "news5 no ticker cat3",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat3\">CAT2</a>",
        "ticker": null,
        "type": "Article"
    }, {
        "title": "news5 no ticker cat4",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat4\">CAT4</a>",
        "ticker": null,
        "type": "Article"
    }, {
        "title": "news5 some ticker cat4",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat4\">CAT4</a>",
        "ticker": "tick5",
        "type": "Article"
    }, {
        "title": "news5 some ticker cat4",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat4\">CAT4</a>",
        "ticker": "tick8",
        "type": "Article"
    }, {
        "title": "news5 some ticker cat4",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat4\">CAT4</a>",
        "ticker": "tick9",
        "type": "Article"
    }, {
        "title": "news6 some ticker cat4",
        "body": "body",
        "post date": "Thu, 09/02/2023 - 09:26",
        "smw category": "<a href=\"/smw-category/cat4\">CAT4</a>",
        "ticker": "tick9",
        "type": "Article"
    }]

    it('Log errors if an article exists with no ticker defined', async () => {
        // mock logger
        const mockError = jest.fn()
        const logger = { error: mockError }
        checkNewsTickers(data, logger)
        // there are 3 no-ticker news, expect logger to be called 3 times
        expect(mockError.mock.calls).toHaveLength(3);
    })


    it('How many different unique tickers have been tagged in the news?', async () => {

        const tickers = getUniqueTickers(data)
        // we have 5 unique tickers
        expect(tickers.length).toBe(5)
    })


    it(' What is the most popular category?', async () => {

        const categories = getCategoriesWithTickers(data)

        // cat1 is a winner
        expect(categories.byPopularity[0][0]).toBe("CAT1")

        // cat1 occurs 6 times
        expect(categories.byPopularity[0][1]).toBe(6)

    })

    it('What is the most popular news category that doesn’t have a ticker symbol associated with it?', async () => {


        const categories = getCategoriesWithTickers(data)

        // cat4 is most popular with some missing tickers
        expect(categories.byCategorySomeNoTicker[0][0]).toBe('CAT4')

        // no tickers at all popular category is 2
        expect(categories.noTickerByCategory[0][0]).toBe("CAT2")
    })
})