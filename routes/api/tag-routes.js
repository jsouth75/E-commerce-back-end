const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: 
    [{
      model: Product, 
      through: ProductTag
    }]
  })
    .then(foundTag => {
      res.json(foundTag)
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: 
    [{
      model: Product,
      through: ProductTag
    }]
  })
    .then(Tag => {
    res.json(Tag)
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(newTag => {
    res.json(newTag)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((Tag) => {
    res.json(Tag)
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((Tag) => {
    res.json(Tag)
    })
});

module.exports = router;
