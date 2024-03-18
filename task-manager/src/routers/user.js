const express = require("express");
const router = express.Router();
const sharp = require('sharp')
const multer = require('multer')
const User = require("../models/user");
const auth = require("../middleware/auth");
const mailer = require('../emails/account')

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.generateToken();
    await user.save();
    mailer.welcomemail(user.email,user.name)
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }

  //   console.log(user);
  //   user
  //     .save()
  //     .then((result) => {
  //       console.log(result)
  //       res.status(201).send(result);
  //     })
  //     .catch((error) => {
  //       res.status(400).send(error);
  //     });
});

router.get("/users", auth, async (req, res) => {
  try {
    const results = await User.find({});
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
  //   User.find({})
  //     .then((result) => {
  //       res.status(200).send(result);
  //     })
  //     .catch((error) => {
  //         res.status(500).send(error);
  //     });
});
router.get("/user/me", auth, async (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    res.status(500).send(error);
  }
  //   User.find({})
  //     .then((result) => {
  //       res.status(200).send(result);
  //     })
  //     .catch((error) => {
  //         res.status(500).send(error);
  //     });
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }

  //   User.findById(_id)
  //     .then((result) => {
  //      if (!result) return res.status(404).send(error);
  //       res.status(201).send(result);
  //     })
  //     .catch((error) => {
  //       res.status(500).send(error);
  //     });
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send("succesfully logout");
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/me", auth,async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "age", "email", "password"];
  const isValidopration = updates.every((update) => {
    return allowedUpdate.includes(update);
  });
  if (!isValidopration) {
    res.status(400).send({ error: "invalid upadates" });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save(); // This will trigger the pre-save middleware

    // // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      res.status(404).send();
    }
    // await req.user.remove();
    mailer.canclationEmail(user.email,user.name)
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

const upload = multer({
  limits: {
      fileSize: 1000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload an image'))
      }

      cb(undefined, true)
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
      const user = await User.findById(req.params.id)

      if (!user || !user.avatar) {
          throw new Error()
      }

      res.set('Content-Type', 'image/png')
      res.send(user.avatar)
  } catch (e) {
      res.status(404).send()
  }
})


module.exports = router;
