import { XIcon } from '@heroicons/react/solid'

function MenuClose(props) {
  return (
    <div>
      <XIcon className={`${"h-8 w-8 text-white"} ${props.className}`}/>
      
    </div>
  )
}

export default MenuClose