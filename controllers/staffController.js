//import model
const Staff = require('../models/staff');

exports.index = async (req, res, next) => {
  //get all data
    const staff = await Staff.find().sort({ _id: -1 }); 
    //.sort({ sortby : __ }) -1 : desc, 1 : asc

    res.status(200).json({ 
      data: staff
    });
}

exports.show = async (req, res, next) => {
    try {
          const { id } = req.params;
          // const staff = await Staff.findOne({ _id: id }); 
          const staff = await Staff.findById(id);

          //no data
          if(!staff){
            throw new Error('ไม่พบข้อมูลพนักงาน') // throw แล้วมันก็จะไปเข้า catch(error) ข้างล่าง 
          } 

          res.status(200).json({ 
            data: staff
          });

    } catch (error) {
      res.status(400).json({ 
        error: {
          message: 'เกิดข้อผิดพลาด ' + error.message 
        }
      });
    }
}

exports.destroy = async (req, res, next) => {
  try {
        const { id } = req.params;

        const staff = await Staff.deleteOne({ _id: id });

        if(staff.deletedCount === 0){ //no data
          throw new Error('ไม่สามารถลบข้อมูลได้ เพราะมันไม่มีไอดีนี้ไงล่ะเจ้าโง่ !') // throw แล้วมันก็จะไปเข้า catch(error) ข้างล่าง 
        } else{
          res.status(200).json({ 
            message: 'ลบข้อมูลเรียบร้อย'
          });
        }


  } catch (error) {
    res.status(400).json({ 
      error: {
        message: 'เกิดข้อผิดพลาด ' + error.message 
      }
    });
  }
}

exports.insert = async (req, res, next) => {
  //destucturing
  const { name, salary } = req.body

  //let staff = new Staff(req.body)
  let staff = new Staff({
    name: name,
    salary: salary
  })

  await staff.save();
  res.status(201).json({ 
    //data: rea.body
    //data: req.body.salary
    //data: req.body.name

    /*destucturing*/
    //data: name  //same as req.body.name
    //OR data: salary

    message: 'เพิ่มข้อมูลเรียบร้อย'
    
  });
}

exports.update = async (req, res, next) => {
  try {
        const { id } = req.params;
        const { name, salary } = req.body;

      /**findById(id) */
        // const staff = await Staff.findById(id);
        // staff.name = name;
        // staff.salary = salary;
        // await staff.save();

      /** findByIdAndUpdate(id, {what do u want to update}) */
        // const staff = await Staff.findByIdAndUpdate(id, {
        //   name: name,
        //   salary: salary
        // });
        // console.log(staff);

        /** .updateOne({WHERE}, {WHAT TO UODATE}) */
        const staff = await Staff.updateOne({ _id: id }, {
          name: name,
          salary: salary
        });
        console.log(staff);
        

        if(staff.nModified === 0){ //no data
          throw new Error('ไม่สามารถแก้ไขข้อมูลได้') // throw แล้วมันก็จะไปเข้า catch(error) ข้างล่าง 
        } else{
          res.status(200).json({ 
            message: 'แก้ไขข้อมูลเรียบร้อย'
          });
        }
        
  } catch (error) {
    res.status(400).json({ 
      error: {
        message: 'เกิดข้อผิดพลาด ' + error.message 
      }
    });
  }
}