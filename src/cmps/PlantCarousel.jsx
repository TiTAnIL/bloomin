import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useNavigate } from 'react-router-dom';

export function PlantCarousel(props) {
    const { plants, onAddToCart } = props;
    const navigate = useNavigate()
    const currPlants = plants.slice(0, 4)

    const settings = {
        // selectedItemSize: 10,
        swipeable: true,
        showThumbs: true,
        showArrows: false,
        showIndicators: false
    }

    const onClickItem = (id) => {
        navigate(`/plant/${id}`)
    }

    if (!currPlants) return <h2>Loading</h2>
    return (
        <div className='med-plant-carousel'>
            <Carousel {...settings} >
                {currPlants.map((plant) => (
                    <div key={plant.name + 'container'} className='med-pop-img-container' onClick={() => onClickItem(plant._id)}>
                        <img src={plant.pic} alt='name'  />
                        <p key={plant.name + 'para'}>{plant.name}</p>
                        <p key={plant.name + plant.price}>{plant.price}</p>
                        <button key={plant.name + 'button'} onClick={() => onAddToCart(plant)}>Add To Cart</button>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
