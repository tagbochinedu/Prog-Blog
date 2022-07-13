import { MenuIcon } from '@heroicons/react/solid'

function MenuOpen(props) {
  return (
    <div>
      <MenuIcon className={`${"h-8 w-8 text-white"} ${props.className}`}/>
    </div>
  )
}

export default MenuOpen