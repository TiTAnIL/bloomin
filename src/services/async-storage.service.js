export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType, delay = 600) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            // console.log(entities.map(entity => entity._id === entityId))
            // console.log(entities.map(entity => entity))
            // console.log(entities.find(entity => entity._id === entityId))
            return entities.find(entity => entity._id === entityId)
        })
}


function post(entityType, newEntity) {
    newEntity._id = newEntity._id || _makeId()
    console.log(newEntity._id)
    return query(entityType)
        .then(entities => {
            entities.unshift(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}


function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}


function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}


function postMany(entityType, newNetities) {
    console.log('postmany activate')
    return query(entityType, newNetities)
        .then(entities => {
            newNetities = newNetities.map(entity => ({ ...entity, _id: (entity._id) ? entity._id : _makeId() }))
            entities.push(...newNetities)
            _save(entityType, entities)
            return entities
        })
}


function _makeId(length = 5) {
    console.log('makeID activateds')
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

