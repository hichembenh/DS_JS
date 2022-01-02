import React from "react";

const Profile = (props)=>{
    return(
        <>
            <p>Name: {props.name}</p>
            <p>Email: {props.email}</p>
            <p>Phone number: {props.numTel || '#'}</p>
        </>
    )
}

export default Profile