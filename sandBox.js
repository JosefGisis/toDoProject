const getData = async function(resource) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        
        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.responseText)
                resolve(data)
            } else if (request.readyState === 4) {
                reject('error getting resource')
            }
        })
        
        request.open('GET', resource)
        request.send()
    })
}

getData('./users.json').then(data => {
    console.log(data)
    return getData('./lists.json')
}).then(data => {
    console.log(data)
    return getData('./toDos.json')
}).then(data => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})

// getToDos('./toDos.json' ,(err, data) => {
//     console.log('callback fired')
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
//     // triangle of doom
//     getToDos('./lists.json', (err, data) => {
//         console.log(data)
//         getToDos('./users.json', (err, data) => {
//             console.log(data)
//         })
//     })
// })

// const getSomething = () => {
//     return new Promise((resolve, reject) => {
//         //resolve('some data')
//         reject('some error')

//     })
// }

// getSomething().then((data) => {
//     console.log(data)
// }).catch(err => {
//     console.log(err)
// })