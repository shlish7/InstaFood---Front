import { storyService } from '../services/story.service'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_STORY = 'SET_STORY'
export const SET_WATCHED_STORY = 'SET_WATCHED_STORY'
export const REMOVE_STORY = 'REMOVE_STORY'
export const SET_STORYS = 'SET_STORYS'
export const SET_SCORE = 'SET_SCORE'

const initialState = {
    count: 10,
    // story: storyService.getLoggedinStory(),
    storys: [],
    watchedStory : null
}

export function storyReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case INCREMENT:
            newState = { ...state, count: state.count + 1 }
            break
        case DECREMENT:
            newState = { ...state, count: state.count - 1 }
            break
        case CHANGE_COUNT:
            newState = { ...state, count: state.count + action.diff }
            break
        case SET_STORY:
            newState = { ...state, story: action.story }
            break
        case SET_WATCHED_STORY:
            newState = { ...state, watchedstory: action.story }
            break
        case REMOVE_STORY:
            newState = {
                ...state,
                storys: state.storys.filter(story => story._id !== action.storyId)
            }
            break
        case SET_STORYS:
            newState = { ...state, storys: action.storys }
            break
        case SET_SCORE:
            newState = { ...state, story: { ...state.story, score: action.score } }
            break
        default:
    }
    // For debug:
    // window.storyState = newState
    // console.log('State:', newState)
    return newState

}
