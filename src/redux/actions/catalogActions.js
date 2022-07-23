import axios from "axios";
import {setCatalog, setIsLoading} from "../reducers/catalogReducer";


export const getCatalog = () => {
    return async (dispatch) => {
        dispatch(setIsLoading(true))
        const response = await axios.get("http://contest.elecard.ru/frontend_data/catalog.json")
        dispatch(setCatalog(response.data.map((elem, index) => {return { ...elem, id: index + 1}}))
        )
    }
}