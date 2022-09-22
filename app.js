let data = require('./files/users.json')
const express = require('express')
const app = express()

app.use(express.json())

// users

// create
app.post('/user/create', (req, res) => {

    let id = 0;
    const last = data[data.length - 1];

    if(last) {
        id = last.id + 1
    }

    if(req.body) {
        data.push({
            id,
            ...req.body
        })

        res.json({
            status: 200,
            data
        })
    }

    res.json({
        status: 401,
        message: "você deixou de passar alguma informação"
    })

})

// read
app.get('/user/read', (req, res) => {
    res.json({
        status: 200,
        users: data
    })
})

// update
app.put('/user/update', (req, res) => {

    const info = req.body;

    data = data.map((user) => {
        if( user.id == info.id ) {
            return info
        } 

        return user
    })

    res.json({
        status: 200,
        data
    })

})

// delete
app.delete('/user/delete', (req, res) => {
    data = data.filter((user) => {
        return user.id !== req.body.id
    })

    res.json({
        status: 200,
        data
    })
})


app.get('*', (req, res) => {
    res.json({
        message: "taporramenor"
    })
})

app.listen(8080, () => {
	console.log('Até aqui tudo certo!')
})