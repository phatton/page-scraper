import { NextResponse } from 'next/server'
 
export async function POST(request: Request) {
    const urlRequest = await request.json() // urlRequest now contains body
    //console.log(urlRequest);//'http://127.0.0.1:7071/api/HttpScraperFunction'
    const res = await fetch('https://httpscraperfunction.azurewebsites.net/api/httpscraperfunction', {
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