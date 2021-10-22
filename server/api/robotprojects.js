const router = require("express").Router();
const { RobotProject } = require("../db/index");

router.delete("/robots/:id", async (req, res, next) => {
  try {
    const robotProject = await RobotProject.destroy({
      where: {
        robotId: req.params.id,
      },
    });
    res.json(robotProject);
  } catch (err) {
    next(err);
  }
});

router.delete("/projects/:id", async (req, res, next) => {
  try {
    const robotProject = await RobotProject.destroy({
      where: {
        projectId: req.params.id,
      },
    });
    res.json(robotProject);
  } catch (err) {
    next(err);
  }
});

module.exports = router;