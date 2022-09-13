const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
    .then(foundCategories => {
      res.json(foundCategories)
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    }
  }).then(category => {
    res.json(category)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(newCat => {
    res.json(newCat)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: {
      id: req.params.id
    }
  }).then(category => {
    res.json(category)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(category => {
    res.json(category)
  })
});

module.exports = router;
