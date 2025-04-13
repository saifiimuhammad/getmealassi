import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "PaymentIntent ID is required." },
      { status: 400 }
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);

    return Response.json({ status: paymentIntent.status });
  } catch (error) {
    console.error("Stripe Error:", error);
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return Response.json({ error: message }, { status: 500 });
  }
}
