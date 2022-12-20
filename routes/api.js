const express = require('express')

const router = express.Router()

const BlogPost = require('../models/blogPosts')

router.get('/', (req,res) => {
  BlogPost.find({ })
          .then((data) => {
            console.log('Data: ', data)
            res.json(data)
          })
          .catch((error) => {
            console.log('error:', error)
          })
})

router.get('/name', (req,res) => {
  const data = {
    username: 'Test1',
    age: 10
  }
  res.json(data)
})

router.post('/save', (req, res) => {
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
      if (error) {
          res.status(500).json({ msg: 'Sorry, internal server errors' });
          return;
      }
      // BlogPost
      return res.json({
          msg: 'Your data has been saved!!!!!!'
      });
  });
});

module.exports = router;
