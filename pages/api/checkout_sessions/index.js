import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if(req.method === "POST") {
        try {
            console.log(req.headers.origin)
            const session = await stripe.checkout.sessions.create({
                line_items: req?.body?.items ?? [],
                mode:"payment",
                payment_method_types: ["card"],
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSİON_ID}`,
                cancel_url:`${req.headers.origin}/cart`
            })
            res.status(200).json(session)
        } catch(err){
            res.status(500).json({statusCode:500, message:err.message})
        }
        
    }else {
        res.setHeader("Allow", "POST")
        res.status(405).end("Method Not Allowed")
    }

}


