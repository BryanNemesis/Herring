import {React} from 'react'

function UserLink({username, children}) {
    const handleUserLink = (event) => {
      event.preventDefault()
      window.location.href = `/profiles/${username}`
    }
    return <span onClick={handleUserLink} className='pointer'>{children}</span>
  }
  
export function UserPicture({user}) {
    return (
        <UserLink username={user.username}>
        <span className='badge bg-dark'>{user.username[0]}</span>
        </UserLink>
    )
}

export function UserDisplay({user, includeFullName}) {
    const nameDisplay = `${user.first_name} ${user.last_name}`
    return (
        <>
        {includeFullName && nameDisplay !== ' ' && <>{nameDisplay}&nbsp;</>}
        <UserLink username={user.username}>
            @<b>{user.username}</b>
        </UserLink>
        </>
    )
}

export default UserDisplay