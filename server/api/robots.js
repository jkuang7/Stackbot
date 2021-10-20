const router = require("express").Router();
const { Robot, Project } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const robots = await Robot.findAll({
      include: { model: Project },
    });
    res.json(robots);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const robot = await Robot.findOne({
      where: {
        id: req.params.id,
      },
      include: Project,
    });
    res.json(robot);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const robot = await Robot.create(req.body);
    res.json(robot);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
