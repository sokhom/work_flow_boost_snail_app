import {FETCH_CUSTOMERS, ADD_NEW} from '../actions/CustomerActs'

interface Action {
    type: String,
    payload: any
}

interface State {
    data: any[],
    loading: boolean
}

const intialState = {
    data: [],
    loading: false
}

export default (state: State = intialState, action: Action) => {
    switch(action.type){
        case FETCH_CUSTOMERS:
            return {
                ...state,
                data: []
            }
        case ADD_NEW: {
            const data = [{
                id: 2,
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman'
              }
            ]
            return {
                ...state,
                data: data
            }
        }
            
        default:
            return state    
    }
}
