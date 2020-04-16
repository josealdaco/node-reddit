const Post = require('../models/post');

module.exports = (app) => {
    app.get('/posts/index', (req, res) => {
        console.log("Even triggered")
            Post.find({}).lean()
                .then(posts => {
                    res.render('posts-index', { posts })
                })
                .catch(err => {
                    console.log(err.message);
                })
        })
        app.get('/posts/new', (req, res) => {
            console.log("Rendering")
            res.render('posts-new')
        })


        app.get("/posts/:id", function(req, res) {
          // LOOK UP THE POST
          Post.findById(req.params.id).lean() // must have lean
            .then(post => {
              res.render("posts-show", { post });
            })
            .catch(err => {
              console.log(err.message);
            });
        });


  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    console.log(req.body)
    const post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      console.log("Saving", err)
      return res.redirect(`/`);
    })
  });


};
