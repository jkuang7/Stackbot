const { green, red } = require("chalk");
const { db, Project, Robot } = require("./server/db");

let robots = [];
let projects = [];

//Helper Functions
const randNum = (num, floor = true) => {
  //generates random num from [0, num)
  if (floor) return Math.floor(Math.random() * num);
  else return Math.random() * num;
};

const makeRobots = (arr, len) => {
  const fuelType = ["gas", "diesel", "electric"];
  for (let i = 0; i < len; i++) {
    const randomFuelType = randNum(fuelType.length);
    const randomFuelLevel = randNum(101, false);
    arr.push({
      name: `Robot ${i}`,
      fuelType: fuelType[randomFuelType],
      fuelLevel: randomFuelLevel,
      imageUrl: "",
    });
  }
  return arr;
};

const makeProjects = (arr, len) => {
  const boolArr = [true, false];
  for (let i = 0; i < len; i++) {
    const randomCompleted = randNum(boolArr.length);
    arr.push({
      title: `Project ${i}`,
      deadline: Date.now(),
      priority: randNum(10) + 1,
      completed: boolArr[randomCompleted],
      description: `Description for Project${i}`,
    });
  }
  return arr;
};

const seed = async () => {
  try {
    //Create Robots and Projects
    robots = makeRobots(robots, 10);
    projects = makeProjects(projects, 10);

    await db.sync({ force: true });
    //seeding
    const robotsInstances = await Promise.all(
      robots.map((robot) => {
        return Robot.create(robot);
      })
    );

    const projectsInstances = await Promise.all(
      projects.map((project) => {
        return Project.create(project);
      })
    );

    //Creating Join Relationships between Robots and Projects via Sequelize Magic Methods
    await Promise.all(
      robotsInstances.map((robot, idx) => {
        return robot.addProject(projectsInstances[idx]);
      })
    );
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
