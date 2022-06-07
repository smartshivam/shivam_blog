import {MongoClient} from "mongodb"

async function handler(req,res){
    if(req.method==="POST"){
        const data = req.body;
        console.log("sendData",data)
        const client = await MongoClient.connect("mongodb+srv://smartshivam:pandey7202@cluster0.ciazpbt.mongodb.net/blogs?retryWrites=true&w=majority")

        const db = client.db()
        const blogsCollection = db.collection("data")
       const result = await blogsCollection.insertOne(data)
       console.log(result)
       client.close()
       res.status(201).json({message:"add successfully"})
    }
}
export default handler;