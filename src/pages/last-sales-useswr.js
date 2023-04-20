import { useEffect, useState } from "react"
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const LastSalesUseSWR = () => {
    const { data, error } = useSWR("https://nextjs-course-53b97-default-rtdb.firebaseio.com/sales.json", fetcher)
    const [sales, setSales] = useState()

    useEffect(() => {
        if(data){
            const transformedSales = [];
            for(const key in data){
                transformedSales.push({
                    id: key, 
                    username: data[key].username,
                    volume: data[key].volume
                })
            }
            setSales(transformedSales)
        }
    }, [data])
    if(error){
        return <p>Failed to load</p>
    }

    if(!data || !sales){
        return <p>Loading data...</p>
    }

  return (
    <ul>
        {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
  )
}

export default LastSalesUseSWR