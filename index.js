import express from 'express'
const app= express()
const port = 3000;

app.listen(port , ()=>{
console.log(`server is running on port ${port}...!`)
})
// app.get('/' ,(req, res)=>{
// res.send("hiiiii....")
// })

const electronicdata=[];
let nextId=1;
app.use(express.json());

//add new data
app.post('/data',(req, res)=>{
const{name,price} =req.body;
const newtea={id: nextId++, name ,price}

electronicdata.push(newtea)
res.status(200).send(newtea)
})

//get all items
app.get('/data',(req, res)=>{
    res.status(200).send(electronicdata)
})

//get item with id 
app.get('/data/:id',(req, res)=>{
    const item= electronicdata.find(t=>t.id === parseInt(req.params.id))
    if(!item){
      return res.status(404).send("data not found")
    }
res.status(200).send(item)
})
//update data
app.post("/data/:id",(req,res)=>{
    const item= electronicdata.find(t=>t.id === parseInt(req.params.id))
// const dataid= req.params.id
const{name,price}=req.body
item.name=name
item.price=price
res.status(200).send(item)
})
//delete data
app.delete('/data/:id',(req, res)=>{
    const index= electronicdata.findIndex(t=>t.id === parseInt(req.params.id))
    if(index===-1){
      return res.status(404).send("data not found")
    }
    electronicdata.splice(index,1)
 return res.status(200).send("item is deleted")
})