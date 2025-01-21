import {useDispatch} from 'react-redux'
import ActionCreators from '../store/redux/actionCreators.ts'
import {bindActionCreators} from 'redux'

const useAppActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(ActionCreators, dispatch)
}

export {
    useAppActions,
}