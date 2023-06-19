'use client'

import { useState } from 'react'
import { FormEvent } from 'react'
import Image from "next/image"
 
export default function Scraper() {
  const [pageData, setPageData] = useState(undefined)
  const [active, setActive] = useState(true)

  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    //Disable Button
    setActive(false)
    setPageData(undefined);

    // Cast the event target to an html form
    const form = event.target as HTMLFormElement

    // Get data from the form.
    const data = {
      q: form.url.value as string
    }

    // Send the form data to our API and get a response.
    const response = await fetch('/scraper/api', {
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(data),
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // The method is POST because we are sending data.
      method: 'POST'
    })

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Word Count: ${result.WordCount}`)
    setPageData(result);
    setActive(true)
  }
 
 
  return (
    <div>        
        <h1 className={`mb-3 text-2xl font-semibold`}>Scrape Content from URL: </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="first" className="pr-5">URL:</label>
          <input type="text" id="url" name="url" required disabled={!active} className="w-1/2"/>
          <button type="submit" disabled={!active} className="pl-5 pr-5">Submit</button>
        </form>
        <div className="pt-5 content-center" style={{
          display: !active?"block":"none"
        }}>
          <Image
            className="content-center"
            src="/circles-menu-1.gif"
            alt="Loading"
            width={100}
            height={100}
          />
        </div>
        { typeof(pageData) !== undefined && pageData && pageData.ImageList.length > 0 && (
        <ul className="pt-5 list-inside">
          {pageData.ImageList.map((img, i) => (
            <li className="pb-5" key={i}>
              <img src={img.Url} width={img.Width ? img.Width : 100 } height={img.Height ? img.Height : 50 } alt={img.Alt} />
              {/* <Image src={img.Url} width={img.Width ? img.Width : 100 } height={img.Height ? img.Height : 50 } alt={img.Alt} /> */}
            </li>
          ))}
        </ul>      
      ) }
        { typeof(pageData) !== undefined && pageData && pageData.WordOccurences.length > 0 && (
          <>
            <h2 className={`mb-3 text-2xl font-semibold`}>Word Statistics</h2>
            <p>Total word Count: <strong>{pageData.WordCount}</strong></p><br />
            <p><strong>Top 10 Word occurences</strong></p>
            <ul className="list-inside">
              {pageData.WordOccurences.map((wo, i) => (
                <li className="pb-3" key={i}>
                  <p>&quot;{wo.Value}&quot; Count: {wo.Count}</p>
                </li>
              ))}
            </ul>
          </>      
      ) }

    </div>   
  )
}