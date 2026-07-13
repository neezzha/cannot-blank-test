import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
console.log("modified something now")
const markCommit = (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

// const makeCommits = (n) => {
//   if (n === 0) return simpleGit().push();
//   const x = random.int(0, 54);
//   const y = random.int(0, 6);
//   const date = moment()
//     .subtract(1, "y")
//     .add(1, "d")
//     .add(x, "w")
//     .add(y, "d")
//     .format();

//   const data = {
//     date: date,
//   };
//   console.log(date);
//   jsonfile.writeFile(path, data, () => {
//     simpleGit()
//       .add([path])
//       .commit(
//         date,
//         {
//           "--date": date,
//         },
//         () => makeCommits(--n)
//       );
//     // .commit(date, { "--date": date }, makeCommits.bind(this, --n));
//   });
// };

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format("YYYY-MM-DDTHH:mm:ss");
  const data = { date: date };

  console.log("Writing data:", data);
  console.log("Making commit for date:", date);

  jsonfile.writeFile(path, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, () => makeCommits(--n));
  });
};

console.log("Starting commits");
makeCommits(500);
