const express=require("express")
const router=express.Router()
const DataController=require("../controllers/apiCalls")

router.post("/create-user",DataController.addUserData)
router.post("/create-calendar",DataController.addCalenderData)
router.post("/create-resource-group",DataController.addResourceGroupData)
router.post("/create-work-shift",DataController.addShiftTimingsData )
router.post("/create-junction-data",DataController.addJunctionTableData)

router.get("/get-all-data",DataController.getDetailsById)
router.get("/get-users",DataController.getUserData)
router.get("/get-calendar",DataController.getCalenderData)
router.get("/get-resource-group",DataController.getResourcesData)
router.get("/get-work-shifts",DataController.getWorkShiftsData)


module.exports=router