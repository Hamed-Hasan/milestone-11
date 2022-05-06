// const express = require('express')
// let cors = require("cors");
// const app = express()
// app.use(cors());
// app.use(express.json())
// const port = process.env.PORT || 5000
// app.get('/',(req, res) => {
//     res.send('hello world welcome back !!!! okkkk')
// })

// const users = [
//     {id: 1, name: 'hamed',age:24,phone: 999},
//     {id: 1, name: 'hasan',age:22,phone: 999},
//     {id: 1, name: 'hamas',age:20,phone: 999},
//     {id: 2, name: 'rifa',age:28,phone: 999},
//     {id: 3, name: 'alifa',age:14,phone: 999},
//     {id: 4, name: 'sayed',age:18,phone: 999},
//     {id: 5, name: 'huma',age:20,phone: 999},
//     {id: 6, name: 'afi',age:10,phone: 999},
//     {id: 6, name: 'afifa',age:12,phone: 999},
// ]
// app.get('/user',(req, res) => {
//     const user = {id: 1,name: 'hamed',age:24,mail:'exg@gmail.com'}
//     res.send(user)
// })
// app.get('/users',(req, res) => {
//     // console.log(req.query);
//     if(req.query.name){
//         const search = req.query.name.toLowerCase()
//         const match = users.filter(user => user.name.toLowerCase().includes(search))
//         res.send(match)
//     }else{

//         res.send(users)
//     }
// })
// app.get('/user/:id',(req, res) => {
//     console.log(req.params)
//         const id = parseInt(req.params.id)
//     const user = users.find(user => user.id === id)
//     res.send(user)
// })
// app.get('/fruits',(req, res) => {
// res.send(['apple','mango','orange'])
// })
// app.get('/fruit/newFruit',(req, res) => {
// res.send('apple','mango','orange')
// })

// // app.post('/use',(req, res) => {
// //     console.log(req.body)
// //     res.send('request post success')
// // })
// app.post('/use',(req, res) => {
//     const user = req.body
//     user.id = users.length + 1;
//     users.push(user)
//     res.send(user)
// })
// app.listen(port, () => {
//     console.log('listening on port',port)
// })

// node express setup 
const express = require('express')
let cors = require("cors") // when i fetch an dynamic back end array data: npm i cors & use this package and use tow cLi 
const app = express()
app.use(cors())  // when i fetch an dynamic back end array data: npm i cors & use this package and use tow cLi 
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
const port = process.env.port || 5000

// node express display send 
app.get('/',(req, res) => {
    res.send('Welcome back !!')
})

// node express call with object
app.get('/user',(req, res) => {
    const user = {id:1, name:'hamed',age:24,phone: 999}
    res.send(user)
})

// node express send with array object search multiple
const users = [
    {id: 1, name: 'hamed',age:24, email: 'hamed@example.com',phone: 999},
    {id: 1, name: 'hasan',age:22, email: 'hasan@example.com',phone: 999},
    {id: 1, name: 'hamas',age:20, email: 'hamas@example.com',phone: 999},
    {id: 2, name: 'rifa',age:28, email: 'rifa@example.com',phone: 999},
    {id: 3, name: 'alifa',age:14, email: 'alifa@example.com',phone: 999},
    {id: 4, name: 'sayed',age:18, email: 'sayed@example.com',phone: 999},
    {id: 5, name: 'huma',age:20, email: 'huma@example.com',phone: 999},
    {id: 6, name: 'afi',age:10, email: 'afi@example.com',phone: 999},
    {id: 6, name: 'afifa',age:12, email: 'afifa@example.com',phone: 999},
]
// http://localhost:5000/array?name=f&email= search path
app.get('/array',(req, res) => {
    if(req.query.name){
        console.log(req.query)
        const search = req.query.name.toLowerCase()
        const match = users.filter(user => user.name.toLowerCase().includes(search))
        res.send(match)
    }else{
        res.send(users)
    }
})

// node express send with object 
app.get('/obj',(req, res) => {
    res.send({name: 'john',address: 'usa'})
})

// node express send with dynamic id search with params 
app.get('/dynamic/:dynamicId',(req, res) => {
    console.log(req.params);
    const dynamicId = parseInt(req.params.dynamicId)
    const arrayUser = users.find(user => user.id === dynamicId)
    res.send(arrayUser)
})

// get data from frontend 
// app.post('/postdata',(req, res) => {
//     console.log(req.body);
//     res.send('send post successfully')
// })
app.post('/postdata',(req, res) => {
    const user = req.body
    user.id = users.length + 1
    users.push(user)
    res.send(user)
})

app.listen(port, () => {
    console.log('That is app listening on port',port);
})