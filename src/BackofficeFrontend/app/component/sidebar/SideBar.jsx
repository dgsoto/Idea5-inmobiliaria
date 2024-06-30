import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Image from 'next/image'
import './sidebar.css'

export default function SideBar() {
   

  
  return (
    <aside className='m-0 p-0 h-100 d-flex flex-column justify-between'>
        <div className='h-100 d-flex flex-column align-items-start justify-content-evently'>
            <ul className='h-100 w-100 p-0 d-flex flex-column align-items-center justift-content-around'>
                <li className='my-4'>
                    <Image src="/"
                    width={20}
                    height={20}>
                    
                    </Image>
                    </li>
                    <li className='my-4'>
                    <Image src='/'
                    width={20}
                    height={20}>
                    
                    </Image>
                </li>
                <li className='my-4'>
                    <Image src='/'
                    width={20}
                    height={20}>
                    
                    </Image>
                </li>
                <li className='my-4'>
                    <Image src='/'
                    width={20}
                    height={20}>
                    
                    </Image>
                </li>
                <li className='my-4'>
                    <Image src='/'
                    width={20}
                    height={20}>
                    
                    </Image>
                </li>
                <li className='my-4'>
                    <Image src='/'
                    width={20}
                    height={20}>
                    
                    </Image>
                </li>
                <li className='my-4'>
                    <Image src='/'
                    width={20}
                    height={20}>
                    
                    </Image>
                </li>
            </ul>
        </div>
        <div className='w-100 h-25 d-flex flex-column align-items-start justify-content-around'>
            <ul className='h-100 w-100 p-0 d-flex flex-column align-items-center justify-content-around'>
                <li className='my-5 py-3'>

                    <Image
                        src='/'
                        width={25}
                        height={25}
                    />
                </li>
                <li className='my-5 py-3'>
                    <Image
                        src='/'
                        width={25}
                        height={25}
                    />
                </li>
            </ul>
        </div>
    </aside>
  )
}
