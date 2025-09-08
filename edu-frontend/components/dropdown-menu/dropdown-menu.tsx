import {MouseEventHandler, ReactNode, RefObject, useRef} from "react"
import { useOnClickOutside } from "usehooks-ts"
import { clsx } from "clsx"

import style from "./dropdown-menu.module.scss"

type DropdownProps = {
  children?: ReactNode
  items: MenuItem[]
  showFn: (bool: boolean) => void
}

export type MenuItem = {
  className?: string
  fn?: MouseEventHandler
  label: string
}

export function DropdownMenu(props: DropdownProps) {
  const ref = useRef<HTMLUListElement>(null)

  useOnClickOutside(ref as RefObject<HTMLUListElement>, () => {
    props.showFn(false)
  })

  return (
    <ul ref={ref} className={style.dropdownMenuList}>
      {props.items.map((el) => {
        return (
          <li
            key={el.label}
            className={clsx(style.dropdownMenuItem, el.className)}
            {...(el.fn && {
              onClick: el.fn,
            })}
          >
            {el.label}
          </li>
        )
      })}
    </ul>
  )
}
