import React from 'react'

const MemeCard = ({ data }) => {
  return (
    <div className="flex h-[300px] w-[300px] justify-between items-center border-black-500 rounded-lg p-2 m-2 overflow-hidden">
      <img src={data.url} alt={data.name} />
    </div>
  )
}

export default MemeCard;


