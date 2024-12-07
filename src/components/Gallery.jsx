import Card from "./Card"

export default function Gallery({ cpas, updateDetails }) {
    
    // console.log(cpas, "Gallery")
    
        const galleryContent = cpas
        .map(cpa => (<Card key={cpa.properties.place_id} cpa={cpa} updateDetails={updateDetails} />))   
        
    // console.log(galleryContent, "Gallery Content")
     
    return (
        <div className="w-4/5 bg-[#ffffff] pb-8 pt-4 mx-auto xl:columns-3 lg:columns-3 md:columns-2">
            {cpas.length === 0? <p>CPAs are loading...</p> : galleryContent }
        </div>
    )
    }