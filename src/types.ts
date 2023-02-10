export type NewsItem = {
    title: string
    body: string
    "post date": string
    "smw category": string
    ticker: string
    type: string
}

export type Data = {
    name: string
}

export type TickCount = {
    count: number
}

export type NewsStats = {
    tickers: number
    noTickers: number
    count: number
}

export type Tickers = { [key: string]: number }
export type Categories = { [key: string]: NewsStats }

export type CategoryStats = { noTickerByCategory: [string, number, number][], byCategorySomeNoTicker: [string, number, number][], byPopularity: [string, number, number][] }