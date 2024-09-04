"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Button } from "@medusajs/ui"
import { Fragment, Suspense, useState } from "react"
import Thumbnail from "../thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductActions from "../product-actions"
import { Region } from "@medusajs/medusa"
import { medusaClient } from "@lib/config"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

type ProductQuickViewProps = {
  product: PricedProduct
  region: Region
  disabled?: boolean
}
const ProductQuickView = ({ product, region }: ProductQuickViewProps) => {
  //   console.log(product)

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className=" inset-0 flex items-center justify-center">
        <Button onClick={openModal} className="w-full">
          Quick View
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-2"
                  >
                    Product Information
                  </Dialog.Title>
                  <div className="grid grid-cols-1 md:grid-cols-2 p-0 bg-white text-black">
                    <div className="flex justify-center items-center">
                      <Thumbnail
                        thumbnail={product.thumbnail}
                        size="square"
                        className="w-[60%] h-[60%] "
                      ></Thumbnail>
                    </div>
                    <div className="pl-2">
                      <label className="font-bold">
                        {product?.metadata?.Brand ?? ""}
                      </label>
                      <label className="font-light line-clamp-2">
                        {product.title}
                      </label>
                      <p className="overflow-y-auto mt-3 mb-3 h-auto max-h-28 whitespace-pre-wrap">
                        {product.description}
                      </p>
                      <LocalizedClientLink
                        href={`/products/${product.handle}`}
                        className=" underline text-black-500"
                      >
                        View details
                      </LocalizedClientLink>
                      <ProductActions product={product} region={region} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ProductQuickView
