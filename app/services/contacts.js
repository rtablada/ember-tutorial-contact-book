import Service from '@ember/service';

const url = `http://ember-contact-book-api.herokuapp.com`;

export default class extends Service {
  constructor() {
    super(...arguments);

    this.loadData();
  }

  async loadData() {
    this.set('loading', true);
    let res = await fetch(url);
    let contacts = await res.json();

    this.set('loading', false);
    this.set('data', contacts);
  }

  async createContact({ name, email }) {
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ name, email })
    });
    let savedContact = await res.json();

    this.set('data', [...this.data, savedContact]);
  }

  editContact({ id, name, email }) {
    this.set('data', this.data.map(contact => {
      if (contact.id === id) {
        return { id, name, email };
      }

      return contact;
    }));
  }
}
