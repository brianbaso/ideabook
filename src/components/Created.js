import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function Created({ date }) {
  if (date) {
    return (
      <div>
        <ReactTimeAgo date={date}/>
      </div>
    )
  }
  return "";
}
