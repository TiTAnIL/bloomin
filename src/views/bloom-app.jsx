import transport from '../assets/imgs/main/transportation_one_line_5.png'
import nunny from '../assets/imgs/main/v939-nunny-mix-06.png'
import environment from '../assets/imgs/main/environment_24-01.png'
import lamp from '../assets/imgs/main/lamp.png'
import sandWatch from '../assets/imgs/main/sandWatch.png'
import wateringCan from '../assets/imgs/main/wateringCan.png'
import cloud801 from '../assets/imgs/main/cloud801.png'
import cloud810 from '../assets/imgs/main/cloud810.png'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPlants } from '../store/actions/plant.actions.js'
import { addItem } from '../store/actions/cart.actions'
import { NavLink } from 'react-router-dom'

export function BloomApp() {

    const { plants, isLoading } = useSelector(state => state.plantModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPlants())
    }, [dispatch, loadPlants])

    const onAddToCart = (plant) => {
        dispatch(addItem({ ...plant, quantity: 1 }))
    }

    const onPlantClick = (plant) => {
        console.log(plant)
    }

    const currPlants = plants.slice(0, 4)

    if (!currPlants) return <h2>Loading</h2>
    return (
        <>
            <section className="cfa-container">

                <div className='cfa'>
                    <h1>Match the pots</h1>
                    <h1>to you</h1>
                    <div className="cfa-btns">
                        <NavLink className="" to='/shop'>
                            <button>Store</button>
                        </NavLink>
                        <button className='transperent'>mix-match</button>
                    </div>
                </div>
            </section>
            <main className="main-layout">
                <div className="promo-tags">
                    <div className='promos promo-env'>
                        <img src={environment} alt="environment" />
                        <p>
                            A care guide for each plant
                        </p>
                    </div>
                    <div className='promos promo-nun'>
                        <img src={nunny} alt="nunny" />
                        <p className='nunny-p'>
                            custom made plants
                        </p>
                    </div>
                    <div className='promos promo-del'>
                        <img src={transport} alt="transport" />
                        <div className='promo-delivery-p'>
                            <p>free deliveries</p>
                            <p>with every buy over 100</p>
                        </div>
                    </div>
                </div>
                <div className='questionnaire-container'>
                    <img class="bottom-image" src={cloud801} alt="Bottom Image" />
                    <img class="top-image" src={cloud810} alt="Top Image" />
                    <div class="text">
                        <h2 className=''>want a new plant and not sure what will fit?</h2>
                        <h2 className=''>every plant you had died?</h2>
                        <h2 className=''>answer the questiones and we`ll match a plant for your needs</h2>
                    </div>

                </div>
                <div className='most-popular'>
                    <h2>Most Popular</h2>
                    <ul className='most-pop-list'>
                        {currPlants.map(plant => {
                            return (<div className='pop-img-container'>
                                <li>
                                    <img className='pop-img' src={plant.pic} alt='name' />
                                    <p>{plant.name}</p>
                                    <p>{plant.price}</p>
                                </li>
                                <button onClick={() => onAddToCart(plant)}>Add To Cart</button>
                            </div>
                            )
                        })}
                    </ul>

                </div>
                <div className='growing-highlights'>
                    <h2>The three emphases for correct cultivation</h2>
                    <ul>
                        <li>
                            <img src={lamp} alt='lamp' />
                            <h2>Ligtning</h2>
                            <p>Choose plants that compatible</p>
                            <p>with the ligtning in your home</p>
                        </li>
                        <li>
                            <img className='times-img' src={sandWatch} alt='sand watch' />
                            <h2>Times</h2>
                            <p>Choose plant that suit</p>
                            <p>with your scheduale</p>
                        </li>
                        <li>
                            <img src={wateringCan} alt='watering can' />
                            <h2>Watering</h2>
                            <p>Know how much water</p>
                            <p>your plant needs</p>
                        </li>
                    </ul>
                </div>
                {/* <div className='showcase'>
                    <h2>Congrats!</h2>
                    <div>gallery</div>
                    <p>want to be here too?</p>
                    <p>tag us on instagram #bloom-in</p>
                </div> */}
            </main>
        </>
    )
}
