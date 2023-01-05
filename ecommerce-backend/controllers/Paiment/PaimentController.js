const Stripe_Key = "sk_test_51LeymeKxK5TNzzT1RJlpxEPbbMa1be01DtD85KFKgsPRrSjfxmQD5IMztR73tR0YAgRJsbW7dn9OdrSGm1UOyxCG00TiK26e5l";
const stripe = require("stripe")(Stripe_Key);
const createCharges = async(req, res, next) =>{

    const{card_ID, customer_Id} = req.body;
    console.log(req.body);
    try{
    const createCharge = await stripe.charges.create({
    receipt_email: 'test@gmail.com',
    amount: 50*100, //USD*100
    currency: "inr",
    card: card_ID,
    customer: customer_Id,
    }); 
    res.send(createCharge);
    }catch(err){
    throw new Error(err);
    }
    }


module.exports = {
    createCharges,
    };