export const synchronizeUsersDiagnosesHistories = () => {
  fetch(`${process.env.APP_URL}/api/regenerateUsersDiagnosesHistories`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("synchronizeUsersDiagnosesHistories", res);
    })
    .catch((err) => {
      console.error("synchronizeUsersDiagnosesHistories", err);
    });
};
