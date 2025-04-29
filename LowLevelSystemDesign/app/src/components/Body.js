import React, { useEffect, useState } from 'react';

import MemeCard from './MemeCard';
const Body = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    const data = await fetch('https://api.imgflip.com/get_memes');
    const json = await data.json();

    console.log('json:', json);

    setMemes((memes => [...memes, ...json.data.memes]));

  }

  return (
    <div className='flex flex-wrap'>
      {memes?.map((meme, index) => {
        return (
          <MemeCard key={index} data={meme} />
        );
      })}
    </div>
  )
}

export default Body;