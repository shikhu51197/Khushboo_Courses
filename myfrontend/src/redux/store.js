import { configureStore } from '@reduxjs/toolkit';
import {userReducer,profileReducer, subscriptionReducer} from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import  {adminReducer}  from './reducers/adminReducer';
import { otherReducer } from './reducers/otherReducer';
 export const server = process.env.REACT_APP_SERVER_URL || "https://khushboo-courses.vercel.app/api/v1";
const store = configureStore({
    reducer:{
        user: userReducer,
        profile: profileReducer,
        course: courseReducer,
        subscription: subscriptionReducer,
        admin: adminReducer,
        other: otherReducer,
    }
});


export default store ; 