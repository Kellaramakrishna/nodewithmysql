const { v4: uuidv4 } = require("uuid");

const addUserData = async (req, res) => {
    const { name, email, age } = req.body;

    const querySql = "CALL create_user(?, ?, ?)";
    const id = uuidv4();
    const values = [id, name, email];

    try {
        const result = await con.query(querySql, values);
        res.status(200).send({id,message:"successfull created"});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const addCalenderData=async(req,res)=>{
    const {calendarName,financialYearStart,financialYearEnd}=req.body
    const querySql="CALL create_calendar(?,?,?,?)"
    const id = uuidv4();
    const values = [id, calendarName,financialYearStart,financialYearEnd];

    try {
        const result = await con.query(querySql, values);
        res.status(200).send({id,message:"successfull created"});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const addResourceGroupData = async (req, res) => {
    const { name, calendarId } = req.body;
    const id = uuidv4();
    const querySql = "CALL create_resource_group(?,?,?)";
    const values = [id, name, calendarId];
    
    try {
        con.query(querySql, values, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
                return;
            }
            // Send success response
            res.status(200).send({id,message: "successfully created"});
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


const addShiftTimingsData = async (req, res) => {
    const { name,noOfHours,startTime,endTime,resourceId} = req.body;
    const id = uuidv4();
    const querySql = "CALL create_work_shift(?,?,?,?,?,?)";

    const values = [id,name,noOfHours,startTime,endTime,resourceId];


    try {
        await con.query(querySql, values);
        res.status(200).send({id,message: "successfully created"});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const getUserData = async(req, res) => {
    try {
        const query = "CALL get_users()";
       await con.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Server error");
            } else {
                res.send(result[0]);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

const getCalenderData=async(req, res) => {
    try {
        const query = "CALL get_calendar()";
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
        const query = "CALL get_resource_group()";
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
        const query = "CALL get_work_shift()";
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
    const { resourceId,userId} = req.body;
    const uuidId = uuidv4();
    const querySql = "CALL create_resource_user_table(?,?,?)";

    const values = [uuidId,resourceId,userId];

    try {
        await con.query(querySql, values);
        res.status(200).send("Junction data added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const getDetailsById = async(req, res) => {
    const { id } = req.body;
    const sqlQuery = "CALL get_resource_data_by_id(?)";
    const values = [id];

    await con.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            const length=result[0].length
            result.unshift({total:length})
            res.status(200).send(result.slice(0,result.length-1));
            
        }
    });
};

// const getDetailsById = async (req, res) => {
//     const { id } = req.body;
//     const sqlQuery = "CALL get_resource_data_by_id(?)";
//     const values = [id];
//     let final_array = [];

//     await con.query(sqlQuery, values, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send("Internal Server Error");
//         } else {
//             const data = result.slice(0, result.length - 1);
//             const arrayList = data[0];
            
//             for (let eachItem of arrayList) {
//                 let new_array = []; // Create a new array for each iteration
//                 new_array.push({
//                     userName: eachItem.user_name,
//                     email: eachItem.email
//                 });
//                 new_array.push({
//                     resourceGroupName: eachItem.resource_group_name
//                 });
//                 new_array.push({
//                     calendarName: eachItem.calendar_name,
//                     startYear: eachItem.start_year,
//                     endYear: eachItem.end_year
//                 });
//                 new_array.push({
//                     workShiftName: eachItem.work_shift_name,
//                     NoOfHours: eachItem.number_of_hours,
//                     startTime: eachItem.start_time,
//                     endTime: eachItem.end_time
//                 });
            
//                 final_array.push(new_array);
//             }
            
//             res.send(final_array);
//         }
//     });
// };


module.exports=
{addUserData,
    addCalenderData,
    addResourceGroupData,
    addShiftTimingsData,
    getUserData,
    getCalenderData,
    getResourcesData,
    getWorkShiftsData,
    addJunctionTableData,
    getDetailsById,

}
