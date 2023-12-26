const sessionIDtoMap = new Map();

export function setUser(id, user){
    sessionIDtoMap.set(id, user);
}

export function getUser(id){
    sessionIDtoMap.get(id)
}