const participantRouter = require("express").Router();
participantRouter.get("/");
participantRouter.post("/createparticipant");
participantRouter.put("/attempted");
participantRouter.put("/bookmark");
participantRouter.put("/clearattempted");
participantRouter.put("/updatequestions");
participantRouter.put("/submit");
module.exports = participantRouter;
