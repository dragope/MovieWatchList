import React from 'react'
import './UserProfile.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { useState } from 'react'
import { auth } from '../firebase/firebase-config';
import { updateProfile, updatePassword, updateEmail } from 'firebase/auth'
import { storage } from '../firebase/firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { async } from '@firebase/util';

function UserProfile() {

    const { user, setUser } = useMovieSearchContext()
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ confirmEmail, setConfirmEmail ] = useState('')
    const [ pic, setPic ] = useState(null)
    const [ password, setPassword ] = useState('')
    const [ passwordConfirm, setPasswordConfirm ] = useState('')
    const [res, setRes] = useState('')

    const profileUpdate = async() => {
        setRes('Please wait, we are processing the changes...')
        const updatedUser = {}
        if(username.length > 1){
                updatedUser.displayName = username;
            } else {
                updatedUser.displayName = user.displayName
            }if(email.length > 1 && email !== confirmEmail){
                return setRes('Emails must match')
            }
            if(pic != null){
                const date = Date.now()
                const imageRef = ref(storage, `/profile-pics/${user.email}+${pic.name}+${date}`)
                try{
                    await uploadBytes(imageRef, pic)
                    const url = await getDownloadURL(imageRef)
                    updatedUser.photoURL = url
                    await updateProfile(auth.currentUser, updatedUser)
                    setRes("Your profile has been succesfully updated! You should see the changes effective in a short bit")
                    setUser(auth.currentUser)
                } catch(err){
                    return setRes(err)
                }
            } else {
                await updateProfile(auth.currentUser, updatedUser)
                setRes("Your profile has been succesfully updated! You should see the changes effective in a short bit")
                setUser(auth.currentUser)
            }
        
    }

    const passwordUpdate = async () => {
        setRes('Please wait, we are processing the changes...')
        if(password === passwordConfirm){
            try{
                await updatePassword(auth.currentUser, password)
                setRes('Your password was updated successfully')
            } catch(error){
                setRes(`There was an error updating your password, please try again. Error: ${error}`)
            }
        } else {
            setRes('Passwords must match')
        }
    }

    const emailUpdate = async () => {
        setRes('Please wait, we are processing the changes...')
        if(email === confirmEmail){
            try{
                await updateEmail(auth.currentUser, email)
                setRes('Your email was updated successfully')
            } catch(error){
                setRes(`There was an error updating your email, please try again. Error: ${error}`)
            }
        }
    }

  return (
    <div className='user-form'>
        <h1 className='user-form-title'>update your profile</h1>
        <div className='user-form-container'>
            <div className='user-profile-form-container'>
                <div className='user-profile-form-fields'>
                    <div className='user-profile-form-container-field'>
                        <label htmlFor="username">username</label>
                        <input type="text" name="username" placeholder={auth.currentUser.displayName ? auth.currentUser.displayName : 'set your username'} onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div className='user-profile-form-container-field'>
                        <label htmlFor="profilepic">profile picture</label>
                        <input type="file" id="img" name="img" onChange={(e)=>{setPic(e.target.files[0])}}/>
                    </div>
                    <button className='user-profile-form-password-submit' onClick={profileUpdate}>update profile</button>
                </div>
                <div className='user-profile-form-fields'>
                    <div className='user-profile-form-container-field'>
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" placeholder={auth.currentUser.email ? auth.currentUser.email : 'email'} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className='user-profile-form-container-field'>
                        <label htmlFor="confirm-email">confim email</label>
                        <input type="confim-email" name="confim-email" placeholder={auth.currentUser.email ? auth.currentUser.email : 'email'} onChange={(e)=>{setConfirmEmail(e.target.value)}}/>
                    </div>
                    
                    { email === confirmEmail ? <button className='user-profile-form-password-submit' onClick={emailUpdate}>update email</button> : <button className='user-form-password-error'>Emails must match</button>}
                </div>
                
            </div>
            <div className='user-password-form-container'>
                <div className='user-password-form-fields'>
                    <div className='user-password-form-container-field'>
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div className='user-password-form-container-field'>
                        <label htmlFor="confirm-password">confirm password</label>
                        <input type="password" name="confirm-password" placeholder='confirm password' onChange={(e)=>{setPasswordConfirm(e.target.value)}}/>
                    </div>
                     { password === passwordConfirm && password.length >= 6 ? <button className='user-form-password-submit'onClick={passwordUpdate}>update password</button> : <button className='user-form-password-error'>Passwords must match and must be, at least, 6 characters long</button>}
                </div>
            </div>
        </div>
        { res && <p className='user-profile-response'>{res}</p> }
    </div>
  )
}

export default UserProfile