const { Router } = require("express");
const {addMembers, getMembers} = require("../Controller/members.controller");
const MembersValidation = require("../Middlewares/members_validation_middleware")
const membersRouter = Router();
membersRouter.get("/get_members", getMembers);
membersRouter.post("/add_member", MembersValidation, addMembers);
module.exports = membersRouter;