import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import queryString from 'query-string';

export function SearchFilter() {
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        checkboxes: {
            Home: false,
            Office: false,
            Balcony: false,
            Yard: false,
        },
        selects: {
            difficulty: null,
            lightning: null,
            watering: null,
        },
        priceRange: {
            min: 0,
            max: 1000,
        },
    });

    useEffect(() => {
        const queryParams = {};

        for (const key in filters.checkboxes) {
            if (filters.checkboxes[key]) {
                queryParams[`location.${key}`] = true;
            }
        }

        for (const key in filters.selects) {
            if (filters.selects[key]) {
                queryParams[key] = filters.selects[key];
            }
        }

        queryParams['priceRange.min'] = filters.priceRange.min;
        queryParams['priceRange.max'] = filters.priceRange.max;

        const search = queryString.stringify(queryParams);
        const url = search ? `/shop?${search}` : '/shop';

        navigate(url);
    }, [filters, navigate]);

    function handleCheckboxChange(event) {
        const { name, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            checkboxes: {
                ...prevFilters.checkboxes,
                [name]: checked,
            },
        }));
    }

    function handleSelectChange(event) {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            selects: {
                ...prevFilters.selects,
                [name]: value,
            },
        }));
    }

    function handleRangeChange(event, rangeType) {
        const { value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: {
                ...prevFilters.priceRange,
                [rangeType]: parseInt(value, 10),
            },
        }));
    }

    function handleResetFilters() {
        setFilters({
            checkboxes: {
                Home: false,
                Office: false,
                Balcony: false,
                Yard: false,
            },
            selects: {
                difficulty: null,
                lightning: null,
                watering: null,
            },
            priceRange: {
                min: 0,
                max: 1000,
            },
        });
    }

    return (
        <section className='filter-container'>
            <h2>Location</h2>
            <label>
                <input
                    type='checkbox'
                    name='Home'
                    checked={filters.checkboxes.Home}
                    onChange={handleCheckboxChange}
                />
                Home
            </label>
            <label>
                <input
                    type='checkbox'
                    name='Office'
                    checked={filters.checkboxes.Office}
                    onChange={handleCheckboxChange}
                />
                Office
            </label>
            <label>
                <input
                    type="checkbox"
                    name="Balcony"
                    checked={filters.checkboxes.Balcony}
                    onChange={handleCheckboxChange}
                />
                Balcony
            </label>
            <label>
                <input
                    type="checkbox"
                    name="Yard"
                    checked={filters.checkboxes.Yard}
                    onChange={handleCheckboxChange}
                />
                Yard
            </label>

            <h2>Difficulty</h2>
            <select
                name="difficulty"
                value={filters.selects.difficulty}
                onChange={handleSelectChange}
            >
                <option value="">Select Difficulty</option>
                <option value="Survivor">Survivor</option>
                <option value="Amateur">Amateur</option>
                <option value="Pro">Pro</option>
            </select>

            <h2>Lightning</h2>
            <select
                name="lightning"
                value={filters.selects.lightning}
                onChange={handleSelectChange}
            >
                <option value="">Select Lightning</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <h2>Watering</h2>
            <select
                name="watering"
                value={filters.selects.watering}
                onChange={handleSelectChange}
            >
                <option value="">Select Watering</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <h2>Price Range</h2>
            <div className="price-container">
                <div className="price-input">
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={filters.priceRange.min}
                        onChange={(e) => handleRangeChange(e, 'min')}
                    />
                    <div className='separator'>-</div>
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={filters.priceRange.max}
                        onChange={(e) => handleRangeChange(e, 'max')}
                    />
                </div>
            </div>
            <button type="reset" onClick={handleResetFilters}>Reset</button>
        </section>
    );
}
