import React from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'

function index() {
    const router = useRouter()
    const onAddMeetup = async(Enterdata)=>{
        console.log("send",Enterdata)
       let result= await fetch("/api/add-blog",{
           method:"POST",
           body:JSON.stringify(Enterdata),
           headers:{
               "Content-Type":"application/json"
           }
       })
       let data = await result.json()
       console.log(data)
       setTimeout(()=>{
        router.push('/')
       },3000)
    }
  return (
      <Fragment>
          <NewMeetupForm onAddMeetup={onAddMeetup} />
      </Fragment>
  )
}

export default index