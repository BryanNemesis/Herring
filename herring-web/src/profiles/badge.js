import React, {useState, useEffect} from 'react'

import {apiProfileDetail, apiProfileFollowToggle} from '../lookup'
import {UserDisplay, UserPicture} from './components'
import {DisplayCount} from './utils'


function ProfileBadge({user, didFollowToggle, profileLoading}) {
    let currentButtonText = (user && user.is_followed) ? 'Unfollow' : 'Follow'
    currentButtonText = profileLoading ? 'Loading...' : currentButtonText
    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentButtonText)
        }
    }

    return user ? (
        <div>
            <UserPicture user={user} />
            <p><UserDisplay user={user} includeFullName /></p>
            <p>{user.country}</p>
            <p>Followers: <DisplayCount>{user.follower_count}</DisplayCount></p>
            <p>Following: <DisplayCount>{user.following_count}</DisplayCount></p>
            <p>{user.bio}</p>
            <button onClick={handleFollowToggle} className='btn btn-sm btn-dark'>
                {currentButtonText}
            </button>
        </div>
    ) : null
}

export function ProfileBadgeComponent({username}) {
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
  
    const handleBackendLookup = (response, status) => {
      if (status === 200) {
        setProfile(response)
      }
    }
  
    useEffect(() => {
      if (didLookup === false) {
        apiProfileDetail(username, handleBackendLookup)
        setDidLookup(true)
      }
  
    }, [didLookup, setDidLookup, username])

    const handleNewFollow = (actionVerb) => {
        setProfileLoading(true)
        apiProfileFollowToggle(username, (response, status) => {
            if (status === 200) {
                console.log(response, status)
                setProfile(response)
            }
            setProfileLoading(false)
        }, actionVerb)
    }

    return !didLookup ? 'Loading...' : profile ?
        <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} />
        : null
}

export default ProfileBadgeComponent

