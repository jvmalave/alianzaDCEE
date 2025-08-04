import { AuthService } from "../../../modules/auth/_services/auth.service"


let userRol$: any = null;

const authService = new AuthService(null as any /* HttpClient */, null as any /* other dependency if needed */);
userRol$ = authService.user?.rol;
console.log("ROL", userRol$)

// Define the menu variable
export let AsideMenuAdminGeneral: any = null;

if (userRol$ === 'admin'){
  AsideMenuAdminGeneral = {
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
          title: 'USUARIOS',
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
          title: 'CATEGORÍAS',
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
          title: 'PRODUCTOS',
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
          title: 'PAGOS PENDIENTES',
          root: true,
          name: "pagos-pendientes",
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          svg: './assets/media/svg/icons/Shopping/Dollar.svg',
          page: '/pagos-pendientes',
          submenu: [
            {
              title: 'Lista Pagos',
              page: '/pagos-pendientes/lista-de-pagos',
            },
          ]
        },
        {
          title: 'SLIDER',
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
          title: 'CUPONES',
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
          title: 'DESCUENTO',
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
         {
          title: 'ACADEMIA ADEL',
          root: true,
          name: "academia",
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          svg: './assets/media/svg/icons/Home/Library.svg',
          page: '/academia',
          submenu: [
            {
              title: 'Cursos disponible',
              page: '/academia/lista-de-cursos',
            }
          ]
        },

        {
          title: 'CONFIGURACION',
          root: true,
          name: "customize",
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol', 
          svg: './assets/media/svg/icons/General/Settings-2.svg',
          page: '/customize',
          submenu: [
            {
              title: 'Actualizar Configuracion',
              page: '/customize/c/lista-configuracion',
            }
          ]
        },
      ]
  
  }
}else if (userRol$ === 'emprendedor'){
   AsideMenuAdminGeneral = {
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
          title: 'MI PERFIL',
          root: true,
          name: "users",
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          svg: './assets/media/svg/icons/General/User.svg',
          page: '/users',
          submenu: [
            {
              title: 'Mi usuario',
              page: '/users/list'
            }
          ]
        },
        { section: 'Productos' },
        // {
        //   title: 'Categorías',
        //   root: true,
        //   name: "categorias",
        //   bullet: 'dot',
        //   icon: 'flaticon2-user-outline-symbol',
        //   svg: './assets/media/svg/icons/Home/Commode2.svg',
        //   page: '/categorias',
        //   submenu: [
        //     {
        //       title: 'Lista Categoría',
        //       page: '/categorias/list'
        //     }
        //   ]
        // },
        {
          title: 'PRODUCTOS',
          root: true,
          name: "Mis productos",
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
              title: 'Ver Mis Productos',
              page: '/productos/lista-de-productos'
            },
          ]
        },
        // {
        //   title: 'Sliders',
        //   root: true,
        //   name: "sliders",
        //   bullet: 'dot',
        //   icon: 'flaticon2-user-outline-symbol',
        //   svg: './assets/media/svg/icons/Design/Image.svg',
        //   page: '/sliders',
        //   submenu: [
        //     {
        //       title: 'Lista Sliders',
        //       page: '/sliders/lista-sliders',
        //     }
        //   ]
        // },
        {
          title: 'CUPONES',
          root: true,
          name: "Mis Cupones",
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
              title: 'Ver Mis Cupones',
              page: '/cupones/listar-cupones',
            }
          ]
        },
        {
          title: 'DESCUENTOS',
          root: true,
          name: "Mis descuentos",
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
              title: 'Ver Mis Descuentos',
              page: '/descuento/listar-descuento',
            }
          ]
        },
        {
          title: 'ACADEMIA ADEL',
          root: true,
          name: "academia",
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          svg: './assets/media/svg/icons/Home/Library.svg',
          page: '/academia',
          submenu: [
            {
              title: 'Cursos disponible',
              page: '/academia/lista-de-cursos',
            }
          ]
        },
      ]
  
  }
}
