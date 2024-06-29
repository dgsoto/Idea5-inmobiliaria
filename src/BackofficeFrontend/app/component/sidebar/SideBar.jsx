'use client'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {useRouter} from next/navigation
import './sidebar.css'

export default function SideBar() {
    const router = useRouter();
  return (
    <aside className='d-flex flex-column align-items-center'>
        <div className='w-100 h-75 d-flex flex-column align-items-start justify-content-around'>
            <ul className='h-100 w-100 p-0 d-flex flex-column align-items-center justift-content-around'>
                <li>
                    <img src='/'
                    width={20}
                    height={20}>
                    
                    </img>
                </li>
                <li>
                    <img src='/'
                    width={20}
                    height={20}>
                    
                    </img>
                </li>
                <li>
                    <img src='/'
                    width={20}
                    height={20}>
                    
                    </img>
                </li>
                <li>
                    <img src='/'
                    width={20}
                    height={20}>
                    
                    </img>
                </li>
                <li>
                    <img src='/'
                    width={20}
                    height={20}>
                    
                    </img>
                </li>
                <li>
                    <img src='/'
                    width={20}
                    height={20}>
                    
                    </img>
                </li>
                <li>
                    <img src='/'
                    width={20}
                    height={20}>
                    
                    </img>
                </li>
            </ul>
        </div>
        <div className='w-100 h-25 d-flex flex-column align-items-start justify-content-around'>
            <ul className='h-100 w-100 p-0 d-flex flex-column align-items-center justify-content-around'>
                <li className='my-5'>

                    <img
                        src='/'
                        width={25}
                        height={25}
                    />
                </li>
                <li className='my-5'>
                    <img
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
