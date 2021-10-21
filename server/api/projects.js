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
    const project = await Project.findOne({
      where: {
        id: req.params.id,
      },
      include: Robot,
    });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.get("/robot/:id", async (req, res, next) => {
  //Gets the list of projects by robot id
  try {
    const robot = await Robot.findOne({
      where: {
        id: req.params.id,
      },
      include: Project,
    });
    res.json(robot.projects);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    await Project.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
