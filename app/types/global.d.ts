export {}

declare global {
  
  interface IImage {
    Url: string,
    Alt: string,
    Width: string,
    Height: string
  }
  interface IWordOccurance {
    Value: string,
    Count: number
  }
  interface IPageData {
    ImageList: IImage[],
    WordCount: number,
    WordOccurences: IWordOccurance[]
  }
}