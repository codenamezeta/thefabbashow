import React, { useState, useEffect } from 'react'
import Nav from '../components/nav/Nav'
import logo from '../imgs/logo.png'
// import data from '../data/data.json'
import Modal from '../components/Modal'
import client from '../client'

function Gallery() {
  useEffect(() => {
    const query = `
    *[_type == "sanity.imageAsset" && opt.media.tags[0]->name.current == "In Gallery"] {
      url,
      altText,
      description,
      title
    }
  `
    client
      .fetch(query)
      .then((data) => {
        setImages(data)
      })
      .catch(console.error)
  }, [])

  const [images, setImages] = useState([])
  const [clickedImg, setClickedImg] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)

  const handleClick = (item, index) => {
    setCurrentIndex(index)
    setClickedImg(item.url)
  }

  const handelRotationRight = () => {
    const totalLength = images.length
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0)
      const newUrl = images[0].url
      setClickedImg(newUrl)
      return
    }
    const newIndex = currentIndex + 1
    const newUrl = images.filter((item) => {
      return images.indexOf(item) === newIndex
    })
    const newItem = newUrl[0].url
    setClickedImg(newItem)
    setCurrentIndex(newIndex)
  }

  const handelRotationLeft = () => {
    const totalLength = images.length
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1)
      const newUrl = images[totalLength - 1].url
      setClickedImg(newUrl)
      return
    }
    const newIndex = currentIndex - 1
    const newUrl = images.filter((item) => {
      return images.indexOf(item) === newIndex
    })
    const newItem = newUrl[0].url
    setClickedImg(newItem)
    setCurrentIndex(newIndex)
  }

  // console.log(images)

  return (
    <>
      <Nav logo={logo} />
      <div className='container' id='gallery_page'>
        <h1>Gallery</h1>
        <div className='gallery'>
          {images.map((item, index) => (
            <div key={index} className='wrapper-images'>
              <img
                src={item.url}
                alt={item.description}
                onClick={() => handleClick(item, index)}
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
          <div>
            {clickedImg && (
              <Modal
                clickedImg={clickedImg}
                handelRotationRight={handelRotationRight}
                setClickedImg={setClickedImg}
                handelRotationLeft={handelRotationLeft}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Gallery
