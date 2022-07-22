import React from 'react'
import './UserProfile.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { useState } from 'react'
import { auth } from '../firebase/firebase-config';
import { updateProfile } from 'firebase/auth'
import { storage } from '../firebase/firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

function UserProfile() {

    const { user, setUser } = useMovieSearchContext()
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ pic, setPic ] = useState(null)
    const [ password, setPassword ] = useState('')
    const [ passwordConfirm, setPasswordConfirm ] = useState('')
    const [res, setRes] = useState('')

    // const profileUpdate =()=>{
    //     const updatedUser = {}
    //     if(username.length > 1){
    //         updatedUser.displayName = username;
    //     } else {
    //         updatedUser.displayName = user.displayName
    //     }
    //     if(email.length > 1){
    //         updatedUser.email = email
    //     } else {
    //         updatedUser.email = user.email
    //     }
    //     if(pic != null){
    //         const date = Date.now()
    //         const imageRef = ref(storage, `/profile-pics/${user.email}+${pic.name}+${date}`)
            
    //         const getUrl = async() => {
    //             const url = await getDownloadURL(imageRef)
    //             console.log(url)
    //         }

    //         const uploadPic = async() => { 
    //             const uploadImage = await uploadBytes(imageRef, pic)
    //             console.log('pic uploaded')
    //             getUrl();
    //         }
    //         uploadPic();
           
    //     console.log(updatedUser)
    //     updateProfile(auth.currentUser, updatedUser)
    //     .then(setRes("Your profile has been succesfully updated"))
    //     .catch(err => console.error(err))

    //     setUser(auth.currentUser)
    // }}

    const profileUpdate = async() => {
        setRes('Please wait, we are processing the changes...')
        const updatedUser = {}
        if(username.length > 1){
                updatedUser.displayName = username;
            } else {
                updatedUser.displayName = user.displayName
            }
            if(email.length > 1){
                updatedUser.email = email
            } else {
                updatedUser.email = user.email
            }
            if(pic != null){
                const date = Date.now()
                const imageRef = ref(storage, `/profile-pics/${user.email}+${pic.name}+${date}`)
                try{
                    await uploadBytes(imageRef, pic)
                    const url = await getDownloadURL(imageRef)
                    updatedUser.photoURL = url
                    await updateProfile(auth.currentUser, updatedUser)
                    setRes("Your profile has been succesfully updated")
                    setUser(auth.currentUser)
                } catch(err){
                    setRes(err)
                }
            } else {
                await updateProfile(auth.currentUser, updatedUser)
                setRes("Your profile has been succesfully updated")
                setUser(auth.currentUser)
            }
        
    }

    const passwordUpdate =()=>{
        console.log('Password updated')
    }

  return (
    <div className='user-form'>
        <h1 className='user-form-title'>update your profile</h1>
        { res && <p>{res}</p> }
        <div className='user-form-container'>
            <div className='user-profile-form-container'>
                <div className='user-profile-form-container-field'>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" placeholder={user.displayName ? user.displayName : 'set your username'} onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className='user-profile-form-container-field'>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" placeholder={user.email ? user.email : 'email'} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className='user-profile-form-container-field'>
                    <label htmlFor="profilepic">profile picture</label>
                    <input type="file" id="img" name="img" onChange={(e)=>{setPic(e.target.files[0])}}/>
                </div>
                <button className='user-profile-form-password-submit' onClick={profileUpdate}>update profile</button>
            </div>
            <div className='user-password-form-container'>
                <div className='user-password-form-container-field'>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className='user-password-form-container-field'>
                    <label htmlFor="confirm-password">confirm password</label>
                    <input type="password" name="confirm-password" placeholder='confirm password' onChange={(e)=>{setPasswordConfirm(e.target.value)}}/>
                </div>
                { password === passwordConfirm && password.length >= 6 ? <button className='user-form-password-submit'onClick={passwordUpdate}>update password</button> : <p>Passwords must match and must be, at least, 6 characters long</p>}
            </div>
        </div>
    </div>
  )
}

export default UserProfile