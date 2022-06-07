import React from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import BlogDetail from '../../components/meetups/BlogDetail'
import MeetupItem from '../../components/meetups/MeetupItem'
import Card from '../../components/ui/Card'
import { MongoClient, ObjectId } from 'mongodb'

function index(props) {
   
  return (
      <Fragment>
         <BlogDetail
         image={props.meetupData.image}
         title={props.meetupData.title}
         address={props.meetupData.address}
         description={props.meetupData.description}/>
      </Fragment>
  )
}
export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://smartshivam:pandey7202@cluster0.ciazpbt.mongodb.net/blogs?retryWrites=true&w=majority")

    const db = client.db();
  
    const blogsCollection = db.collection('data');
  
    const blogs = await blogsCollection.find({}, { _id: 1 }).toArray();
  
    client.close();
  
    return {
      fallback: 'blocking',
      paths: blogs.map((meetup) => ({
        params: { BlogId: meetup._id.toString() },
      })),
    };
  }

  export async function getStaticProps(context) {
    // fetch data for a single meetup
  
    const BlogId = context.params.BlogId;
  
    const client = await MongoClient.connect("mongodb+srv://smartshivam:pandey7202@cluster0.ciazpbt.mongodb.net/blogs?retryWrites=true&w=majority")

    const db = client.db();
  
    const blogsCollection = db.collection('data');
  
    const selectedBlog = await blogsCollection.findOne({
      _id: ObjectId(BlogId),
    });
  
    client.close();
  
    return {
      props: {
        meetupData: {
          id: selectedBlog._id.toString(),
          title: selectedBlog.title,
          address: selectedBlog.address,
          image: selectedBlog.image,
          description: selectedBlog.description,
        },
      },
    };
  }
export default index