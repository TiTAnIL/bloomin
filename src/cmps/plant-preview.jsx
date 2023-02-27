import { useDispatch } from "react-redux";
import React, { useCallback } from 'react';
import { Link } from "react-router-dom"
import { removePlant } from "../store/actions/plant.actions";
import LoadingScreen from "react-loading-screen"

export function PlantPreview({ plant }) {

    const dispatch = useDispatch()

    const onRemovePlant = useCallback(() => {
        dispatch(removePlant(plant._id))
    }, [dispatch, plant._id])

    if (!plant) return <LoadingScreen
        loading={true}
        bgColor="rgba(255,255,255,0.5)"
        spinnerColor="#4850b9"
        textColor="#676767"
        logoSrc="../logo.png"
        text="Loading"
    >
        {" "}
    </LoadingScreen>
    return <div>
        <Link to={`/plant/${plant._id}`} className="plants-list" >
            <img src={plant.pic} alt={plant._id}></img>
            <h2>{plant.name}</h2>
            <p>{plant.price}</p>
        </Link>
        <Link to={`/plant/edit/${plant._id}`}>
            <button>
                edit
            </button>
        </Link>
        <button onClick={() => onRemovePlant()}>Delete Plant</button>
    </div>
}