import { PlantPreview } from "./plant-preview"
import React from 'react'


export function PlantList({ plants }) {
    return (<React.Fragment>
        <section className="plants-cards">
            <div className='card-layout'>
                {plants.map(plant =>
                    <div className={'preview-card card-ID' + plant._id} key={'plantNum' + plant._id} >
                        <PlantPreview key={plant._id} plant={plant} />
                    </div>)}
            </div>
        </section>
    </React.Fragment>
    )
}
