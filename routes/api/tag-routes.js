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
    .then((updatedTag) => {
    res.json(updatedTag)
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
      where: {
        id: req.params.id,
      }
    }).then(tagPost => {
      if (!tagPost) {
        res.status(404).json({ message: "Tag not found"});
        return;
      }
      res.json(tagPost);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  });

module.exports = router;
