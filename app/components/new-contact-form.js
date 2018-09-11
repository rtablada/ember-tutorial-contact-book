import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  contacts: service('contacts'),

  reset() {
    this.set('name', '');
    this.set('email', '');
  },

  actions: {
    saveContact(ev) {
      ev.preventDefault();

      this.contacts.createContact({
        name: this.name,
        email: this.email
      });

      this.reset();
    }
  }
})
