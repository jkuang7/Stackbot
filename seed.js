const { green, red } = require("chalk");
const { db, Project, Robot } = require("./server/db");

//Helper Functions
const randNum = (num, returnDecimal = false) => {
  if (!returnDecimal) {
    //Returns random integer [0, num) (exclusive of num)
    return Math.floor(Math.random() * num);
  } else {
    //Returns a Random Decimal [0,num] (inclusive of num)
    const random =
      Math.random() < 0.5 ? (1 - Math.random()) * num : Math.random() * num;
    return parseFloat(random.toFixed(2));
  }
};

const randNumArr = (num, numArray, lenOfArr) => {
  //returns an array of random numbers (all unique) from 0 to num excluding num
  //length is how many arrays do you want to generate?
  const map = new Map();
  for (let i = 0; i < numArray; i++) {
    map.set(i, []);
  }
  for (let [key, value] of map) {
    while (value.length < lenOfArr) {
      const randomNum = Math.floor(Math.random() * num);
      if (value.indexOf(randomNum) === -1 && randomNum !== key)
        value.push(randomNum);
    }
  }

  return map;
};

const makeRobots = (len) => {
  const robotsArr = [];
  const fuelType = ["gas", "diesel", "electric"];
  for (let i = 1; i <= len; i++) {
    const randomIdx = randNum(fuelType.length);
    const fuelLevel_RandomDecimal = randNum(100, true);
    robotsArr.push({
      name: `Robot ${i}`,
      fuelType: fuelType[randomIdx],
      fuelLevel: fuelLevel_RandomDecimal,
    });
  }
  return robotsArr;
};

const makeProjects = (len) => {
  const projectsArr = [];
  const boolArr = [true, false];
  for (let i = 1; i <= len; i++) {
    const randomIdx = randNum(boolArr.length);
    projectsArr.push({
      title: `Project ${i}`,
      deadline: new Date(),
      priority: randNum(10) + 1,
      completed: boolArr[randomIdx],
      description: `Description for Project ${i}`,
    });
  }
  return projectsArr;
};

const createRobotsDB = async (robots) => {
  return Promise.all(
    robots.map((robot) => {
      return Robot.create(robot);
    })
  );
};

const createProjectsDB = async (projects) => {
  return Promise.all(
    projects.map((project) => {
      return Project.create(project);
    })
  );
};

const seed = async () => {
  try {
    //Creates 10 random Robots and Projects
    let robots = [];
    let projects = [];
    const amount = 10;
    robots = makeRobots(amount);
    projects = makeProjects(amount);

    //Sync Force on DB
    await db.sync({ force: true });

    //Returns an array of Robot and Project Model instances
    const robotsArr = await createRobotsDB(robots);
    const projectsArr = await createProjectsDB(projects);

    //Sequelize Magic Methods -- Creating Join Relationships between Robots and Projects

    //Seeding Join Table from Robots to Projects
    await Promise.all(
      robotsArr.map((robot) => {
        const map = randNumArr(robotsArr.length, 10, 4);
        for (let [key, value] of map) {
          for (let i = 0; i < value.length; i++) {
            const idx = value[i];
            const project = projectsArr[idx];
            return robot.addProject(project);
          }
        }
      })
    );

    //Seeding Join Table from Projects to Robots
    await Promise.all(
      projectsArr.map((project) => {
        const map = randNumArr(projectsArr.length, 10, 4);
        for (let [key, value] of map) {
          for (let i = 0; i < value.length; i++) {
            const idx = value[i];
            const robot = robotsArr[idx];
            return project.addRobot(robot);
          }
        }
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
