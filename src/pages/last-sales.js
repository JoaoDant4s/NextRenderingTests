
export default function LastSales(props){

    console.log(props)

    if(!props.transformedSales){
        return <p>No data yet...</p>
    }

  return (
    <ul>
        {props.transformedSales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
  )
}

export async function getServerSideProps(){
    const transformedSales = [];
    await fetch("https://nextjs-course-53b97-default-rtdb.firebaseio.com/sales.json")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for(const key in data){
            transformedSales.push({
                id: key, 
                username: data[key].username,
                volume: data[key].volume
            })
        }
        console.log(transformedSales)
    })
    return{
        props: {
            transformedSales: transformedSales,
        }
    }
}