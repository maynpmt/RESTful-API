module.exports.isAdmin = (req, res, next) => {
    const { _id, name, email, role } = req.user;

    if( role === 'admin' ){
        next();
    } else{
        return res.status(403).json({
            error: {
                message: 'ไม่มีสิทธิ์ในการใช้งานส่วนนี้ เฉพาะผู้ดูแลระบบเท่านั้น'
            }
        })
    }
}