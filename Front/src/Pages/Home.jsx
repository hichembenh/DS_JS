import React, {useState} from "react";
import Navbar from "../Components/Navbar";
import {Marginer} from "../Components/marginer";
import FileBase from 'react-file-base64';
import '../Components/styles.css'
import {API} from "../utils/API";
import {BoxContainer} from "../Components/components";

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')).result)
    const [passError, setPassError] = useState('')
    const [success,setSeccuess] = useState(false)
    console.log(user)
    const handleImg = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setUser({...user, img: reader.result})
            }
        }
        reader.readAsDataURL(e.file)
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const response = await API.patch(`/${user._id}`, user);
            if (response.status === 200){
                setSeccuess(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Navbar/>
            <Marginer direction="vertical" margin={100}/>
            <div>
                {success && <p color="green">User updated</p>}
            </div>
            <div className="card">
                <img
                    src={user.img || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                    style={{width: "100%"}}/>
                <h1>{user.name}</h1>
                <p className="title">{user.email}</p>
                <p>{user.numTel}</p>
                <p>
                    <label htmlFor='image'>Upload image</label>
                    <FileBase type="file" id="image" multiple={false} onDone={handleImg}/>
                </p>
                {passError && <p>{passError}</p>}
                <button onClick={handleSubmit}>Upload</button>
            </div>
        </>
    )
}

export default Home