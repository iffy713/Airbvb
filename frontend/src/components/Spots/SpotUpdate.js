import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getSpotDetails, updateSpot } from "../../store/spots"

export default function UpdateSpotForm(){

    // const spotObj = useSelector(state => state.spot.singleSpot)

    const { spotId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [country, setCountry] = useState()
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [description, setDesprition] = useState()
    // const [errors, setErrors] = useState([])

    useEffect(()=>{
        dispatch(getSpotDetails(spotId))
    },[dispatch, spotId])

    const handleSubmit = async e =>{
        e.preventDefault()

        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            price,
            description
        }

        // let createdSpot = await dispatch(createNewSpot(newSpot))
        // if(createNewSpot){
        //     history.push(`/spots/current`)
        // }
        let updatedSpot = await dispatch(updateSpot(spotId,newSpot))
        if(updatedSpot){
            // setErrors([])
            history.push('/spots/current')
        }
    }

    return(
        <div>
            <div>Update My Spot</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Address"
                        required
                        type={'text'}
                        value={address}
                        onChange={e=>setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="City"
                        required
                        type={'text'}
                        value={city}
                        onChange={e=>setCity(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="State"
                        required
                        type={'text'}
                        value={state}
                        onChange={e=>setState(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="Country"
                        required
                        type={'text'}
                        value={country}
                        onChange={e=>setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="Latitude"
                        required
                        type={'text'}
                        value={lat}
                        onChange={e=>setLat(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="Lontitude"
                        required
                        type={'text'}
                        value={lng}
                        onChange={e=>setLng(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="Name of your spot"
                        required
                        type={'text'}
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <input placeholder="Price per night"
                        required
                        type={'text'}
                        value={price}
                        onChange={e=>setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <textarea placeholder="Description"
                        required
                        type={'text'}
                        value={description}
                        onChange={e=>setDesprition(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>

    )
}
