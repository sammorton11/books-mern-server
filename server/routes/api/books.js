const express = require('express');
const router = express.Router();

// Load Book model
const Book = require('../../models/Book');

router.get('/test', (_req, res) => res.send('book route testing!'));

router.get('/', (_req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(_err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(_err => res.status(404).json({ nobookfound: 'No Book found' }));
});

router.post('/', (req, res) => {
  Book.create(req.body)
    .then(_book => res.json({ msg: 'Book added successfully' }))
    .catch(_err => res.status(400).json({ error: 'Unable to add this book' }));
});

router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(_book => res.json({ msg: 'Updated successfully' }))
    .catch(_err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(_book => res.json({ mgs: 'Book entry deleted successfully' }))
    .catch(_err => res.status(404).json({ error: 'No such a book' }));
});

module.exports = router;