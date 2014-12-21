Polymer('paper-tag-input', {

  publish: {
    /**
     * Character separating tags
     *
     * @attribute delimiter
     * @type string
     * @default ''
     */
    delimiter: ',',

    /**
     * The label for this input. It normally appears as grey text inside
     * the text input and disappears once the user enters text.
     *
     * @attribute label
     * @type string
     * @default ''
     */
    label: '',

    /**
     * If true, the label will "float" above the text input once the
     * user enters text instead of disappearing.
     *
     * @attribute floatingLabel
     * @type boolean
     * @default false
     */
    floatingLabel: false,

    /**
     * Set to true to style the element as disabled.
     *
     * @attribute disabled
     * @type boolean
     * @default false
     */
    disabled: {value: false, reflect: true},

    /**
     * The current value of the input.
     *
     * @attribute value
     * @type String
     * @default ''
     */
    value: '',

    /**
     * All typed tags.
     *
     * @attribute value
     * @type Array
     * @default []
     */
    tags: [],

    /**
     * All tags representeds as string.
     *
     * @attribute value
     * @type String
     * @default ''
     */
    tagString: '',

    /**
     * The most recently committed value of the input.
     *
     * @attribute committedValue
     * @type String
     * @default ''
     */
    committedValue: ''

  },

  ready: function () {
    var app = this;
    this.$.input.onkeypress = function (e) {
      // adding tag
      if (e.charCode == app.delimiter.charCodeAt(0)) {
        if (app.value != '') {
          var tag = document.createElement('div');
          tag.classList.add('tag');
          tag.setAttribute('horisontal', '');
          tag.setAttribute('layout', '');

          tag.appendChild((function (value) {
            var e = document.createElement('span');
            e.innerText = value;
            return e;
          }(app.value)));

          tag.appendChild((function () {
            var e = document.createElement('a');
            e.onclick = function (e) {
              // deleting tag
              var t = e.path[1];
              app.$.tags.style['width'] = app.$.tags.offsetWidth - (t.offsetWidth + 10) + 'px';
              app.$.tags.dataset['left'] = Math.min(0, parseInt(app.$.tags.dataset['left']) + 8 + t.offsetWidth);
              app.$.tags.style['margin-left'] = app.$.tags.dataset['left'] + 'px';
              t.remove();

              app.updateTags();
            };
            e.innerHTML = '&times;';
            return e;
          }()));

          app.$.tags.appendChild(tag);

          //console.log(tag.offsetWidth);

          app.$.tags.style['width'] = app.$.tags.offsetWidth + tag.offsetWidth + 10 + 'px';

          if (app.$.tags.offsetWidth > app.$.container.offsetWidth - 60) {
            app.$.tags.dataset['left'] = app.$.tags.dataset['left'] - (tag.offsetWidth + 8) + (app.tags.length == 0 ? 40 : 0);
            app.$.tags.style['margin-left'] = app.$.tags.dataset['left'] + 'px';
          }

          app.updateTags();

          app.value = '';
        }
        return false;
      }
    };
  },

  changeAction: function (e) {
  },

  clickContainer: function (e) {
    this.$.input.focus();
  },

  updateTags: function () {
    var tags = this.$.tags.childNodes;
    this.tags = [];
    for (var i = 0; i < tags.length; i++) {
      this.tags.push(tags[i].childNodes[0].innerText);
    }
    this.tagString = this.tags.join(this.delimiter);
  }
});