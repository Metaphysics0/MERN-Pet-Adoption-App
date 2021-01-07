import React from 'react'

const Users = ({user}) => {
  return (
    <tr className="admin-right__users--user">
      <td className="email">{user.email}</td>
      <td className={user.admin ? "status red" : 'status'}>{user.admin ? 'admin' : 'user'}</td>
    </tr>
  )
}

export default Users
