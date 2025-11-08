const mongodb = require('../data/database');
const { ObjectId } = require('mongodb'); // proper import

// Get ALL contacts
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase();// database name
    const contacts = await db.collection('contactsDB').find().toArray(); // collection name
    res.status(200).json(contacts);
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
};

// Get ONE contact by ID
const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId first
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = mongodb.getDatabase();
    const contact = await db.collection('contactsDB').findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('❌ Error fetching contact by ID:', error);
    res.status(500).json({ message: 'Error fetching contact by ID' });
  }
};

// Create a New Contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = mongodb.getDatabase();
    console.log('✅ Connected DB:', db.databaseName);
    const response = await db.collection('contactsDB').insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ message: '✅ Contact created successfully', id: response.insertedId });
    } else {
      res.status(500).json({ message: '❌ Failed to create contact.' });
    }
  } catch (error) {
    console.error('❌ Error creating contact:', error);
    res.status(500).json({ message: 'Error creating contact' });
  }
};

// Update a Contact
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = mongodb.getDatabase();
    const response = await db.collection('contactsDB').replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found or no changes made.' });
    }
  } catch (error) {
    console.error('❌ Error updating contact:', error);
    res.status(500).json({ message: 'Error updating contact' });
  }
};

// Delete a Contact
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const response = await db.collection('contactsDB').deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found.' });
    }
  } catch (error) {
    console.error('❌ Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
