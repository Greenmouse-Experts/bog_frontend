import * as ActionType from '../type';

const initialState = {
    users: [],
    usersData: [],
    admins: [],
    isLoading: false,
    error: null,
}

const UserReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ActionType.FETCH_USERS:
            return {
                ...state,
                isLoading: false,
                users: payload,
                error: null,
            }
        case ActionType.FETCH_ANALYZE_USERS:
            return {
                ...state,
                isLoading: false,
                usersData: payload,
                error: null,
            }
        case ActionType.FETCH_ADMIN:
            return {
                ...state,
                isLoading: false,
                admins: payload,
                error: null,
            }
        case ActionType.ADD_ADMIN:
            return {
                ...state,
                isLoading: false,
                admins: [payload, ...state.admins],
                error: null,
            }
        case ActionType.DELETE_ADMIN:
            return {
                ...state,
                isLoading: false,
                admins: state.admins.filter(where => where.id !== payload.userId),
                error: null,
            }

        default: return state;
    }
}
export default UserReducer;