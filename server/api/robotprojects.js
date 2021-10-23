const router = require("express").Router();
const { RobotProject } = require("../db/index");

router.post("/", async (req, res, next) => {
  try {
    const robotProject = await RobotProject.create(req.body);
    res.json(robotProject);
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { robotId, projectId } = req.body;
    const robotProject = await RobotProject.destroy({
      where: {
        robotId,
        projectId,
      },
    });
    res.json(robotProject);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
