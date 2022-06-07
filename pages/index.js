import React from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'

function index(props) {
    // const Dummy_Data=[{
    //     id:"m1",
    //     title:"First Blog",
    //     address:"Dummy Address",
    //     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbrvOZf5zaHg_9a8upGltfVtObFu_0QH1rcw&usqp=CAU"

    // }]
  return (
      <Fragment>
          <MeetupList meetups={props.blogs}/>
      </Fragment>
  )
}

export async function getStaticProps(){
    const client = await MongoClient.connect("mongodb+srv://smartshivam:pandey7202@cluster0.ciazpbt.mongodb.net/blogs?retryWrites=true&w=majority")

    const db = client.db()
    const blogsCollection = db.collection("data")
    const BlogData = await blogsCollection.find().toArray()
    client.close()
    return{
        props:{
            blogs: BlogData.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
              })),      
              },
              revalidate: 3,

              
    }
}

export default index