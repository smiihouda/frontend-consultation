
export default {

  items: [
    {
      name: 'Home',
      url: '/patient/home',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },



    },

    {

      name: 'Profile',
      url : '/patient/profil',
      icon: 'icon-puzzle',

    },
    {
      name: 'Paiment',
      url: '/patient/paiment',
   icon: 'icon-cursor',

    },

    {
      name: 'Planning',
      url: '/patient/planning',
      icon: 'icon-star',

    },
    {
      name: 'Rendez_vous',
      url: '/patient/rendez_vous',
      icon: 'icon-star',

    },




    {
      divider: true,
    },



    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      attributes: { disabled: true },
    },

  ],
};
