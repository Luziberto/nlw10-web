import { api } from '../lib/axios'
import Main from '../components/home/main'
import httpClient from '../lib/httpClient'

export default async function Home() {
  const [pools, guesses] = await Promise.all([getPoolsCount(), getGuessCount()]);
  
  return (
    <Main pools={ pools } guesses={ guesses } />
  )
}



export const getPoolsCount = async (): Promise<number> => {
  const poolCountResponse = await httpClient.get('pools/count', {}, { next: { revalidate: 3600 }})
  const { pools } = poolCountResponse.data
  return pools
}

export const getGuessCount = async (): Promise<number> => {
  const guessCountResponse = await api.get('guesses/count', { next: { revalidate: 3600 }})
  const { guesses } = guessCountResponse.data
  return guesses
}