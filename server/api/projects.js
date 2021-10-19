const router = require("express").Router();
const { Project, Robot } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const robot = await Project.findOne({
      where: {
        id: req.params.id,
      },
      include: Robot
    });
    res.json(robot);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
