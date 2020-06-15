import * as actions from '../actions/Item.act'
import Item, {Category} from '../../models/Item'
// import { Item } from 'react-navigation-header-buttons'

interface Action {
  type: string,
  payload: any
}

interface CategorySelection extends Category {
    isChecked: boolean
}
interface ItemState {
  data: Category[],
  filter: Category[],
  selection: CategorySelection[],
  loading: boolean
}

const intialState: ItemState = {    
  data: [],
  filter: [],
  selection: [],
  loading: false
}

const reducer = (state:ItemState = intialState, action: Action): ItemState => {
  // console.log('item reducer', state)
  switch(action.type){
    case actions.FETCH_CATEGORIES:               
      return {
          ...state,
          filter: state.data.filter((item: any) => item.name !== '')
      }
    case actions.CATEGORY_SELECTION:               
        return {
            ...state,
            selection: state.data.map((item: any) =>{ return {...item,isChecke:false}})
        }  
    case actions.ADD_NEW_CATEGORY: {
      const {name='', description='', category = {id:0, name:''}}= action.payload            
      const data = {
          id: 0,
          name: name,
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: description,
          category: category
        }            
      return {
          ...state,
          data: [...state.data, data]
      }
    }
    case actions.SEARCH_CATEGORY: {
      const {search=''}= action.payload
      const filter = state.data.filter((item: any) => {
        return item.name === search || search === ''
      })
      return {
        ...state,
        filter: [...filter]
      }    
    }          
    default:
      return state    
  }
}

export default reducer
