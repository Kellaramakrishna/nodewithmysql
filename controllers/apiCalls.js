const { v4: uuidv4 } = require("uuid");

const addUserData = async (req, res) => {
    const { name, email, age } = req.body;

    const querySql = "CALL adding_users(?, ?, ?, ?)";
    const uuidId = uuidv4();
    const values = [uuidId, name, email, age];

    try {
        await con.query(querySql, values);
        res.status(200).send("User added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const addCalenderData=async(req,res)=>{
    const {calenderName,financialYearStart,financialYearEnd}=req.body
    const querySql="CALL adding_calender(?,?,?,?)"
    const uuidId = uuidv4();
    const values = [uuidId, calenderName,financialYearStart,financialYearEnd];

    try {
        await con.query(querySql, values);
        res.status(200).send("Calender data added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const addResourceGroupData = async (req, res) => {
    const { name, calenderId, userId } = req.body;
   

            const id = uuidv4();
            const querySql = "CALL adding_resource_group(?,?,?,?)";
            const values = [id, name, calenderId, userId];
            try {
                await con.query(querySql, values);
                res.status(200).send("Resource group data added successfully");
            } catch (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
            }

};


const addShiftTimingsData = async (req, res) => {
    const { name,noOfHours,startTime,endTime,resourceId} = req.body;
    const uuidId = uuidv4();
    const querySql = "CALL adding_work_shift(?,?,?,?,?,?)";

    const values = [uuidId,name,noOfHours,startTime,endTime,resourceId];


    try {
        await con.query(querySql, values);
        res.status(200).send("work shifts data added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const getUserData = async(req, res) => {
    try {
        const query = "SELECT * FROM users";
       await con.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Server error");
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

const getCalenderData=async(req, res) => {
    try {
        const query = "SELECT * FROM calender";
       await con.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Server error");
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

const getResourcesData=async(req, res) => {
    try {
        const query = "SELECT * FROM resource_group";
       await con.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Server error");
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

const getWorkShiftsData=async(req, res) => {
    try {
        const query = "SELECT * FROM work_shifts";
       await con.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Server error");
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

const addJunctionTableData = async (req, res) => {
    const { userId, calenderId, resourceId, workShiftId } = req.body;
    const uuidId = uuidv4();
    const querySql = "CALL adding_junction_table_record(?,?,?,?,?)";

    const values = [uuidId, userId, calenderId, resourceId, workShiftId];

    try {
        await con.query(querySql, values);
        res.status(200).send("Junction data added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const getCalenderDetailsById = async(req, res) => {
    const { id } = req.params;
    const sqlQuery = "CALL get_calender_by_resource_id(?)";
    const values = [id];

    await con.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send(result[0]);
        }
    });
};



module.exports={addUserData,addCalenderData,addResourceGroupData,addShiftTimingsData,getUserData,getCalenderData,getResourcesData,getWorkShiftsData,addJunctionTableData,getCalenderDetailsById}
