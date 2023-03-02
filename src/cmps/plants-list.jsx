import { PlantPreview } from "./plant-preview"


export function PlantList({ plants }) {
    return (<>
        <section className="plants-cards">
            <h2 className='shop-headline'>Shop</h2>
            <div className='card-layout'>
                {plants.map(plant =>
                    <div className={'preview-card card-ID' + plant._id} key={'plantNum' + plant._id} >
                        <PlantPreview key={plant._id} plant={plant} />
                    </div>)}
            </div>
        </section>
    </>
    )
}
