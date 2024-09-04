"use client"
import { Listbox, Transition } from "@headlessui/react"
import { cache, Fragment, useEffect } from "react"
import { StateType } from "@lib/hooks/use-toggle-state"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"
import { useState } from "react"
import { ProductCategoryWithChildren } from "types/global"
import { medusaClient } from "@lib/config"

// type CategoryOption = {
//   name: string
//   url: string
//   handle: string
// }

type CategorySelectProps = {
  toggleState: StateType
}

const getCategoriesList = cache(async function (
  offset: number = 0,
  limit: number = 100
): Promise<{
  product_categories: ProductCategoryWithChildren[]
}> {
  const { product_categories, count } = await medusaClient.productCategories
    .list({ limit, offset }, { next: { tags: ["categories"] } })
    .catch((err) => {
      throw err
    })

  return {
    product_categories,
  }
})

const CategorySelect = ({ toggleState }: CategorySelectProps) => {
  var [categoryList, setCategoryList] = useState<any>(null)

  const { state } = toggleState

  useEffect(() => {
    const loadCategory = async () => {
      setCategoryList(await getCategoriesList(0, 99))
    }
    loadCategory()
  }, [])

  return (
    <div>
      <Listbox as="span" className="my-2">
        {/* <Listbox.Button className="py-1 w-full  flex justify-start">
          <div className="text-2xl leading-10 hover:text-ui-fg-disabled">
            <span>Categories</span>
          </div>
        </Listbox.Button> */}
        <div className="flex relative w-full min-w-[320px]">
          {/* <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          > */}
          <Listbox.Options static>
            {categoryList?.product_categories &&
            categoryList?.product_categories?.length > 0 ? (
              <ul className="grid grid-cols-1 gap-2 ml-2">
                {categoryList?.product_categories
                  ?.slice(0, 99)
                  .map((c: any) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child: any) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <Listbox.Option
                        value={c.id}
                        className="flex flex-col gap-2 text-ui-fg-subtle text-white"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base text-2xl",
                            children && "txt-small-plus"
                          )}
                          onClick={close}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          - {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child: any) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base text-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    - {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </Listbox.Option>
                    )
                  })}
              </ul>
            ) : null}
          </Listbox.Options>
          {/* </Transition> */}
        </div>
      </Listbox>
    </div>
  )
}

export default CategorySelect
