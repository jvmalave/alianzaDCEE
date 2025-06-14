export const AsideMenuAdminGeneral = {
    items: [
      {
        title: 'Bienvenida',
        root: true,
        name: "dashboard",
        icon: 'flaticon2-architecture-and-city',
        svg: './assets/media/svg/icons/Design/Layers.svg',
        page: '/dashboard',
        translate: 'MENU.DASHBOARD',
        bullet: 'dot',
      },
      { section: 'Usuario' },
      {
        title: 'Usuarios',
        root: true,
        name: "users",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/General/User.svg',
        page: '/users',
        submenu: [
          {
            title: 'Gestion Usuarios',
            page: '/users/list'
          }
        ]
      },
      { section: 'Productos' },
      {
        title: 'Categorías',
        root: true,
        name: "categorias",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Home/Commode2.svg',
        page: '/categorias',
        submenu: [
          {
            title: 'Lista Categoría',
            page: '/categorias/list'
          }
        ]
      },
      {
        title: 'Productos',
        root: true,
        name: "productos",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Devices/TV2.svg',
        page: '/productos',
        submenu: [
          {
            title: 'Crear Producto',
            page: '/productos/registrar-producto',
          },
          {
            title: 'Lista Productos',
            page: '/productos/lista-de-productos'
          },
        ]
      },
      {
        title: 'Sliders',
        root: true,
        name: "sliders",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Design/Image.svg',
        page: '/sliders',
        submenu: [
          {
            title: 'Lista Sliders',
            page: '/sliders/lista-sliders',
          }
        ]
      },
      {
        title: 'Cupones',
        root: true,
        name: "cupones",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Devices/Cardboard-vr.svg',
        page: '/cupones',
        submenu: [
          {
            title: 'Registrar Cupones',
            page: '/cupones/registrar-cupon',
          },
          {
            title: 'Lista Cupones',
            page: '/cupones/listar-cupones',
          }
        ]
      },
      {
        title: 'Descuento',
        root: true,
        name: "descuento",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Shopping/Sale2.svg',
        page: '/descuento',
        submenu: [
          {
            title: 'Registrar Descuento',
            page: '/descuento/registrar-descuento',
          },
          {
            title: 'Lista Descuentos',
            page: '/descuento/listar-descuento',
          }
        ]
      },
    ]
}