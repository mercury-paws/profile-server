import Contact from '../db/models/Contact.js';

  export const getContacts = async () => {
    try {
        const data = await Contact.find({ verify: true });
    return {
      data
    };
    } catch (error) {
        throw new Error('Error fetching contacts from the database');
    }
    
  };

  export const findContact = (data) => Contact.findOne(data);

  export const addContact = (data) => Contact.create(data);

  export const updateContact = (filter, data) => Contact.findOneAndUpdate(filter, data);