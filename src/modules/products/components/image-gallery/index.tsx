"use client"

import { Image as MedusaImage } from "@medusajs/medusa"
import { Button, Container } from "@medusajs/ui"
import Image from "next/image"

import Lightbox, { SlideImage } from "yet-another-react-lightbox"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import Inline from "yet-another-react-lightbox/plugins/inline"
import Counter from "yet-another-react-lightbox/plugins/counter"
import "yet-another-react-lightbox/plugins/counter.css"

import React from "react"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  let slides: SlideImage[] | { src: string; thumbnail: string }[] | undefined =
    []

  images.map((image) => {
    slides.push({
      src: image.url,
      thumbnail: image.url,
    })
  })

  const [index, setIndex] = React.useState(0)

  const toggleOpen = (state: boolean) => () => setOpen(state)

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current)

  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center  w-[100%] md:w-[70%] h-[600px]">
        <Lightbox
          styles={{
            container: {
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0)",
            },
            thumbnailsContainer: { backgroundColor: "transparent" },
            thumbnailsTrack: {
              width: "100%",
              backgroundColor: "rgba(0,0,0,0)",
              padding: 0,
            },
            thumbnail: { backgroundColor: "rgba(0,0,0,0)" },
            navigationNext: {
              color: "black",
              backgroundColor: "rgba(0,0,0,0)",
            },
            navigationPrev: {
              color: "black",
              backgroundColor: "rgba(0,0,0,0)",
            },
            toolbar: { backgroundColor: "rgba(0,0,0,0)" },
          }}
          index={index}
          slides={slides}
          plugins={[Inline, Thumbnails, Counter]}
          on={{
            view: updateIndex,
            click: toggleOpen(true),
          }}
          thumbnails={{ vignette: false }}
          counter={{
            separator: " / ",
            container: {
              className:
                "flex justify-center w-full h-4  items-center bg-gray-250 ",
              style: {
                top: "unset",
                bottom: 0,
                width: "100%",
                color: "black",
              },
            },
          }}
        />
        <Lightbox
          open={open}
          close={toggleOpen(false)}
          index={index}
          plugins={[Thumbnails, Counter]}
          slides={slides}
          on={{ view: updateIndex }}
          thumbnails={{ vignette: false }}
          animation={{ fade: 0 }}
          controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        />
      </div>
    </div>
  )
}

export default ImageGallery
