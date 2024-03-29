import { useDispatch } from "react-redux";
import React, { useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { removePlant } from "../store/actions/plant.actions";
import LoadingScreen from "react-loading-screen"
import trashBin from '../assets/imgs/main/ic-actions-trash.png'

export function PlantPreview({ plant }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onRemovePlant = useCallback((event) => {
    dispatch(removePlant(plant._id))
    event.preventDefault()
  }, [dispatch, plant._id])

  const onEditClick = (event) => {
    event.preventDefault()
    navigate(`/shop/edit/${plant._id}`)
  }
    
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

  return (
    <>
      <Link to={`/shop/${plant._id}`} className="plants-list" >
        <img src={plant.pic} alt={plant._id} />
        <h2>{plant.name}</h2>
        <p>{plant.price}</p>
        <div className="plant-controls">
          <span onClick={(event) => onEditClick(event)} className="on-img-btn edit">📝</span>
          <span className="on-img-btn delete" onClick={(event) => onRemovePlant(event)}><img src={trashBin} /></span>
        </div>
      </Link>
    </>
  )
}
