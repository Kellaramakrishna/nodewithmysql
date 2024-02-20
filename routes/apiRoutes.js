const express=require("express")
const router=express.Router()
const DataController=require("../controllers/apiCalls")

router.post("/add-user",DataController.addUserData)
router.post("/add-calender",DataController.addCalenderData)
router.post("/add-resource-group",DataController.addResourceGroupData)
router.post("/add-work-shift",DataController.addShiftTimingsData )
router.get("/get-users",DataController.getUserData)
router.get("/get-calender",DataController.getCalenderData)
router.get("/get-resources",DataController.getResourcesData)
router.get("/get-work-shifts",DataController.getWorkShiftsData)
module.exports=router