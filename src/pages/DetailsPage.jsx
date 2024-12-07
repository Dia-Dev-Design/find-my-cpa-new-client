import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import commentSection from "../components/CommentSection"
import clockIcon from '../assets/clock.svg'
import phoneIcon from '../assets/telephone-fill.svg'
import locationIcon from '../assets/geo-alt-fill.svg'


export default function DetailsPage() {
    const [cpa, setCpa] = useState(null)
    const {id} = useParams()

useEffect(() => {
    // Query the API if a Card component was not clicked on
    
        async function getCpaFromAPI() {
            const res = await fetch(`https://api.geoapify.com/v2/places?api_key=${import.meta.env.VITE_CPA_KEY}&categories=office.accountant&filter=place:${id}`)
            const data  = await res.json() // destructure the JSON response
            console.log("This is CPA DATA line 19",data)
            setCpa(data.features[0])
        }
        getCpaFromAPI()
    
}, [id])

// console.log(cpa)

if (cpa) {
    return (
        <>
        <div className="bg-[#ffffff] py-24">
        <div className="rounded-md mx-[10%]">
            
            <h1 className="text-2xl font-medium" >{cpa.properties.name}</h1>
            <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2 mt-4"><img src={locationIcon} />
            <p className="font-normal">{cpa.properties.address_line2}</p></div>
            <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2 mt-4"><img src={phoneIcon} />
            <p className="font-normal">{cpa.properties.datasource.raw.phone}</p></div>
            <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2 mt-4"><img src={clockIcon} />
            <p className="font-normal">{cpa.properties.opening_hours}</p></div>
        </div>
        </div>
        <div className="bg-[#fdfaee] pt-8 min-h-[600px]">
        <CommentSection cpaId={cpa.properties.name} />
        </div>
        </>
    )
} else {
    return (
        <p className="mt-24 mx-[10%]">No details available</p>
    )
}
}
