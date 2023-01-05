const {coupon} = require('../../models');

const affichecouponbyiduser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const coupons = await coupon.findAll({where:{id_user:id}});
        if(coupons){
            return res.status(200).json(coupons);
        }
    } catch (error) {
        console.log(error.message);
    }
}





module.exports = {
    affichecouponbyiduser,
  };



