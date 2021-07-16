const _store = new WeakMap()
const _listeners = new WeakMap()

class Redux {
    constructor(reducer){
        this.reducer = reducer;
    }
    dispatch(action){
        const newState = this.reducer(_store.get(this),action);
        _store.set(this,newState);
    }
     getStore(){
        return _store.get(this)
    }
}

const store = new Redux((state = [], action) => {
    if(action.type === "bugAdded"){
        return [...state,{name : action.payload.name,resolved : false}]
    }
    else if (action.type === "bugResolved"){
        return state.map(item => {
            if(item.name === action.payload.name){
                return {...item,resolved:true}
            } else return item
        })
    } else return state;
})

store.dispatch({
    type : "bugAdded",
    payload : {name : "bugOne"}
})


store.dispatch({
    type : "bugAdded",
    payload : {name : "bugTwo"}
})

store.dispatch({
    type : "bugResolved",
    payload : {name : "bugOne"}
})


store.dispatch({
    type : "bugAdded",
    payload : {name : "bugThree"}
})

console.log(store.getStore())