import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Vases } from "../cmps/vases"
import { FAQ } from "../cmps/details-FAQ"
import { Accessories } from "../cmps/accessories"
import { plantService } from "../services/plant.service"
import LoadingScreen from "react-loading-screen"

import waterPot from "../assets/imgs/monestra/waterpot.png"
import puzzle from "../assets/imgs/monestra/puzzle.png"
import lightBulb from "../assets/imgs/monestra/lightbulb.png"
import breaker from "../assets/imgs/main/breaker1.png"


export const PlantDetails = () => {

    const params = useParams()
    const [plant, setPlant] = useState(null)

    const loadPlant = () => {
        const plantId = params.id
        plantService.getById(plantId).then(plant => {
            setPlant(plant)
        })
    }

    useEffect(() => {
        loadPlant()
    }, [])

    if (plant === null) return <LoadingScreen
        loading={true}
        bgColor="rgba(255,255,255,0.5)"
        spinnerColor="#4850b9"
        textColor="#676767"
        logoSrc="../logo.png"
        text="Loading"
    >
        {" "}
    </LoadingScreen>
    return <>
        <main className="plant-container">
            <section className="plant-details">
                <h2>{plant.name}</h2>
                <p>diameter: {plant.diameter} CM</p>
                <p>height: {plant.height} CM</p>
                <p className="plant-price">{plant.price}</p>
                <p>Choose vase:</p>
                <Vases plant={plant} />
            </section>
            <section className="plant-preview">
                <img className="main-image" src={plant.pic[0]} alt={`mainImg${plant.id}`} ></img>
                <div className="enlarge-image">
                    <img src={plant.pic[1]} alt={`img2${plant.id}`}></img>
                    <img src={plant.pic[2]} alt={`img3${plant.id}`}></img>
                </div>
            </section>
        </main>
        <section className="needs-container">
            <div className="needs">
                <img alt="puzzle" src={puzzle} />
                <p className="assistant-reg-20pt">Difficulty level</p>
                <p>{plant.difficulty}</p>
            </div>
            <div className="needs">
                <img alt="lightBulb" src={lightBulb} />
                <p className="assistant-reg-20pt">Lightning</p>
                <p>
                    Partially - you need a bright room <br />
                    Close window  <br />
                    but without direct sun
                </p>
            </div>
            <div className="needs">
                <img alt="waterPot" src={waterPot} />
                <p className="assistant-reg-20pt">Watering</p>
                <p>
                    Little - water when the soil is dry<br />
                    starting to dry<br />
                    Excess water will cause root rot
                </p>
            </div>
        </section>
        <section className="about-faq">
            <div className="about-plant">
                <h2>About:</h2>
                <p className="assistant-reg-20pt">{plant.about}</p>
                <img alt="breaker" src={breaker} />
            </div>
            <FAQ />
            <Accessories />
        </section>
    </>
}