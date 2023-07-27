export default async function Home() {
  const count = await getPoolsCount()
  return (
    <div>
      Hello NLW {count}
    </div>
  )
}

export const getPoolsCount = async (): Promise<number> => {
  const response = await fetch('http://127.0.0.1:3333/pools/count')
  const data = await response.json()
  return data.pools
}