'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { BiStore } from 'react-icons/bi'


const MainNav = () => {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Обзор',
      active: pathname === `/${params.storeId}/`
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Панель ',
      active: pathname === `/${params.storeId}/billboards`
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Категории',
      active: pathname === `/${params.storeId}/categories`
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Размеры',
      active: pathname === `/${params.storeId}/sizes`
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Цвет',
      active: pathname === `/${params.storeId}/colors`
    },
    {
      href: `/${params.storeId}/materials`,
      label: 'Продукты',
      active: pathname === `/${params.storeId}/materials`
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`
    }
  ]

  return (
    <nav className='flex items-center ml-2 gap-1'>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`text-sm  transition-colors hover:text-blue600 ${route.active ? 'font-bold dark:text-white' : 'font-normal'}`}
        >{route.label}</Link>
      ))}
    </nav>
  )
}

export default MainNav