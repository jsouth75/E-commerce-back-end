const router = require('express').Router();
const { Model } = require('sequelize');
const { Category, Product, ProductTag } = require('../../models');

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
    }, 
    incude: [Product]
  })
    .then(category => {
    res.json(category)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)  
    .then((category) => {
      if (req.body.tagIds) {
        const categoryId = req.body.tagIds.map((tag_id) =>
        {
          return {
            category_name: category.id,
            tag_id,
          };
        });
        return Category.bulkCreate(categoryId);
      }
      res.status(200).json(category);
    })
    .then((categoryId) => res.status(200).json(categoryId))
    .catch((err) => {
      console.log(err);
        console.log(err);
        res.status(400).json(err);
    });
  });

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
    where: {
      id: req.params.id
      }
    }
  ).then(category => {
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
