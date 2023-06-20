import { NextResponse } from 'next/server'
 
export async function POST(request: Request) {
    const functionUrl : string | undefined = process.env.SCRAPER_FUNCTION_URL
    const urlRequest = await request.json() // urlRequest now contains body

    if(typeof functionUrl === undefined || !functionUrl){
        return NextResponse.error()
    }
    
    const res = await fetch(functionUrl as string, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Edg/100.0.1185.29'
    },
    body: JSON.stringify({ q: urlRequest.q })
    })

    const data = await res.json()

    return NextResponse.json(data)
}