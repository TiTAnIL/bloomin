import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../hooks/useForm'
import { useDropzone } from 'react-dropzone';
import { plantService } from '../services/plant.service.js';
import { addPlant, updatePlant } from '../store/actions/plant.actions.js'
import { useDispatch } from 'react-redux';

export function Edit() {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [plant, handleChange, setPlant] = useForm(plantService.getEmptyPlant())

    useEffect(() => {
        const plantId = params.id
        if (!plantId) return
        plantService.getById(plantId)
            .then((plant) => {
                setPlant(plant)
            })
            .catch((err) => {
                console.log('err:', err)
            })
            console.log(plant, plantId)
    }, [])


    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                setImages((prevState) => ({
                    ...prevState,
                    [index === 0 ? "primary" : index === 1 ? "secondary" : "tertiary"]: file,
                }))
            }
            reader.readAsDataURL(file);
        })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const [images, setImages] = useState({
        primary: null,
        secondary: null,
        tertiary: null,
    })

    const handleIncrement = (field) => {
        setPlant((prevPlant) => ({
            ...prevPlant,
            [field]: prevPlant[field] + 1
        }))
    }

    const handleDecrement = (field) => {
        setPlant((prevPlant) => ({
            ...prevPlant,
            [field]: prevPlant[field] - 1
        }))
    }

    const handleSubmit = (event) => {
        if (plant._id) {
            dispatch(updatePlant(plant)).then(() => {
                navigate('/shop')
            })
        } else {
            dispatch(addPlant(plant)).then(() => {
                navigate('/shop')
            })
        }
    }

    return (
        <main className="page-container">
            <div className="form-container">
                <form>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" maxLength={17} value={plant.name} onChange={handleChange} required />
                    <div className="form-field">
                        <label htmlFor="diameter">Diameter:</label>
                        <div className="increment-decrement">
                            <button type="button" onClick={() => handleDecrement('diameter')}>-</button>
                            <input type="text" id="diameter" name="diameter" value={plant.diameter} onChange={handleChange} required />
                            <button type="button" onClick={() => handleIncrement('diameter')}>+</button>
                        </div>
                    </div>
                    <div className="form-field">
                        <label htmlFor="height">Height:</label>
                        <div className="increment-decrement">
                            <button type="button" onClick={() => handleDecrement('height')}>-</button>
                            <input type="text" id="height" name="height" value={plant.height} onChange={handleChange} required />
                            <button type="button" onClick={() => handleIncrement('height')}>+</button>
                        </div>
                    </div>
                    <div className="form-field">
                        <label htmlFor="price">Price:</label>
                        <div className="increment-decrement">
                            <button type="button" onClick={() => handleDecrement('price')}>-</button>
                            <input type="text" id="price" name="price" value={plant.price} onChange={handleChange} required />
                            <button type="button" onClick={() => handleIncrement('price')}>+</button>
                        </div>
                    </div>
                    <label htmlFor="difficulty">Growing Difficulty:</label>
                    <select id="difficulty" name="difficulty" value={plant.difficulty} onChange={handleChange} required>
                        <option value="">Select a Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Pro">Pro</option>
                    </select>
                    <label htmlFor="about">About:</label>
                    <textarea id="about" name="about" value={plant.about} onChange={handleChange} wrap="hard" rows="6" cols="100" maxLength="300" />
                </form>
            </div>
            <div className="image-preview-container">

                <div className='main-preview-image' {...getRootProps()}>
                    <input
                        type="file"
                        id="primary"
                        name="primary"
                        required
                        onChange={(e) =>
                            setImages((prevState) => ({
                                ...prevState,
                                primary: e.target.files[0],
                            }))
                        }
                    />
                    {images.primary ? (
                        <img
                            src={URL.createObjectURL(images.primary)}
                            alt="Preview"
                            className="preview-image"
                        />
                    ) : (
                        <p className="preview-text">Drag and drop an image here, or click to select a file</p>
                    )}
                </div>

                <div className="secondary-preview-images">

                    <div className="secondary-preview-image" {...getRootProps()}>
                        <input
                            type="file"
                            id="secondary"
                            name="secondary"
                            required
                            onChange={(e) =>
                                setImages((prevState) => ({
                                    ...prevState,
                                    secondary: e.target.files[1],
                                }))
                            }
                        />
                        {images.secondary ? (
                            <img
                                src={URL.createObjectURL(images.secondary)}
                                alt="Preview"
                                className="preview-image"
                            />
                        ) : (
                            <p className="preview-text">Drag and drop an image here, or click to select a file</p>
                        )}

                    </div>

                    <div className="secondary-preview-image" {...getRootProps()}>
                        <input
                            type="file"
                            id="tertiary"
                            name="tertiary"
                            required
                            onChange={(e) =>
                                setImages((prevState) => ({
                                    ...prevState,
                                    tertiary: e.target.files[2],
                                }))
                            }
                        />
                        {images.tertiary ? (
                            <img
                                src={URL.createObjectURL(images.tertiary)}
                                alt="Preview"
                                className="preview-image"
                            />
                        ) : (
                            <p className="preview-text">Drag and drop an image here, or click to select a file</p>
                        )}

                    </div>
                </div>
                <div className='submit-button'>
                    <button onClick={() => handleSubmit()}>Submit</button>
                </div>
            </div>
        </main>
    )
}

