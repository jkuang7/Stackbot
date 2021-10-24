const router = require("express").Router();
const { Project, Robot, RobotProject } = require("../db/index");
const Sequelize = require("sequelize");

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
  //Return all projects that match robotId
  try {
    const robotProjects = await RobotProject.findAll({
      where: {
        robotId: req.params.id,
      },
    });

    const projects = await Promise.all(
      robotProjects.map(async (robotProject) => {
        const project = await Project.findOne({
          where: {
            id: robotProject.projectId,
          },
        });
        return project;
      })
    );

    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/notrobot/:id", async (req, res, next) => {
  try {
    
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

router.put("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    res.send(await project.update(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
