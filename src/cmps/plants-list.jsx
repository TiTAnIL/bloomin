import { PlantPreview } from "./plant-preview"


export function PlantList({ plants }) {

    return (

        <section className='card-layout'>
            <h2 className='shop-headline'>Shop</h2>
            {plants.map(plant =>
                <div className={'preview-card card-ID' + plant._id} key={'plantNum' + plant._id} >
                    <PlantPreview key={plant._id} plant={plant} />
                </div>)}
        </section>

    )
}
