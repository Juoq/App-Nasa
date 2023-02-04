import React from 'react'

type Props = {
    img: string | undefined;
    title: string | undefined;
    dateImage: string | undefined;
    copyright: string | undefined;
}

const Figure = ({img, title, dateImage, copyright}: Props) => {
  return (
    <div>
        <h2>{title}</h2>
        <img src={img} alt="Foto del día" />
        <div className='data-box'>
            <p>Fecha: {dateImage}</p>
            <p>Copyrigth: {copyright}</p>
        </div>
    </div>
  )
}

export default Figure