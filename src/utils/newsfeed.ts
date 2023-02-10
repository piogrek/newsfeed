import { NewsItem } from "../types";


export async function GetNewsFeed(): Promise<NewsItem[]> {
    return await fetch("https://www.youinvest.co.uk/rest/views/stockmarketwire.json?display_id=smw_web_service").then((r) => r.json())
}

