import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'

export interface NavProps  {
    navigation: NavigationScreenProp<NavigationState,NavigationParams>
}

export interface BaseProps extends NavProps {   
    actionMenu?: () => void
} 