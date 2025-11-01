const mongodb = require('../data/database');
const { ObjectId } = require('mongodb'); // proper import

// Get ALL contacts
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase().db('contactsDB'); // database name
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

    const db = mongodb.getDatabase().db('contactsDB');
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

module.exports = {
  getAll,
  getSingle
};
