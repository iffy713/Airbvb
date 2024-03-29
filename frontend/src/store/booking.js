import { csrfFetch } from "./csrf"

const LOAD_SPOT_BOOKINGS = 'bookings/loadSpotBookings'
const LOAD_USER_BOOKINGS = 'bookings/loadUserBookings'
const CREATE_BOOKING = 'booking/createBooking'

const actionGetSpotBookings = (bookings) => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        bookings
    }
}

const actionGetUserBookings = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        bookings
    }
}

const actionCreateBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

export const thunkGetSpotBookings = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    // console.log("!!!!!!response in thunk of get sopt booing",res)
    if(res.ok){
        const data = await res.json()
        // console.log("data in thunkkkkkkk", data)
        dispatch(actionGetSpotBookings(data.Booking))
    }
}

export const thunkGetUserBookings = () => async(dispatch) => {
    const res = await csrfFetch(`/api/bookings/current`)
    console.log(res)
    if(res.ok){
        const data = await res.json()
        console.log("data in thunkkkkkkk", data)
        dispatch(actionGetUserBookings(data.Bookings))
    }
}

export const thunkCreateBooking = (spotId, booking) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
    if(res.ok){
        const newBooking = await res.json()
        // console.log("creating booking in thunk",newBooking)
        dispatch(actionCreateBooking(newBooking))
    }
}

const bookingReducer = (state={}, action) => {
    let newState = {}
    switch(action.type){
        case LOAD_SPOT_BOOKINGS:
            action.bookings.forEach(booking => (
                // console.log(booking)
                newState[booking.id] = booking
            ))
            return newState

        case LOAD_USER_BOOKINGS:
            action.bookings.forEach(booking => (
                newState[booking.id] = booking
            ))
            return newState

        case CREATE_BOOKING:
            newState = {...state}
            newState[action.booking.id] = action.booking

            return newState

        default:
            return state
    }
}

export default bookingReducer
