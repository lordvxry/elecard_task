const SET_CATALOG = "SET_CATALOG"
const SET_IS_LOADING = "SET_IS_LOADING"

const initialState = {
    data: [],
    isLoading: true,
}

export default function catalogReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CATALOG:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state
    }
}

export const setCatalog = (payload) => ({
    type: SET_CATALOG, payload
})

export const setIsLoading = (payload) => ({
    type: SET_IS_LOADING, payload
})