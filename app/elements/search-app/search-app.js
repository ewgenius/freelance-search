Polymer('search-app', {

  mobile: false,

  minPrice: 0.1,

  maxPrice: 0.2,

  privateProfiles: false,

  nativeLanguage: true,

  updating: false,

  dataLoaded: false,

  data: [{
    name: 'Marco Test',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg',
    price: '0.03',
    email: 'test@test.com',
    status: 'ready',
    languages: {
      from: 'Russian',
      to: ['English', 'French', 'Deutch']
    },
    rating: 4,
    vissible: false
  }],

  ready: function () {

  },

  toggleAdvanced: function () {
    this.$.advanced.toggle();
  },

  search: function () {
    this.updating = true;
    var app = this;

    // dummy data

    setTimeout(function () {
      app.dataLoaded = true;

      for (var i = 0; i < 12; i++) {
        app.data.push({
          name: 'Marco Test',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg',
          price: '0.03',
          email: 'test@test.com',
          status: ['ready', 'busy', 'not_locking'][Math.floor(Math.random() * 3)],
          languages: {
            from: 'Russian',
            to: ['English', 'French', 'Deutch']
          },
          rating: 4,
          vissible: false
        });
      }

      app.updating = false;
    }, 1000);
  }
});