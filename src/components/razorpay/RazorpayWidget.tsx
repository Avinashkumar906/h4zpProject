import { loadRazorpay } from './loadrazorpay.util';
import { PayWidgetType } from '../../util';
import DynamicForm from './DynamicForm';

interface RazorpayWidgetProps {
  id?: string;
  data: PayWidgetType;
  onSuccess?: (response: any) => void;
}

const RazorpayWidget = ({ id, data, onSuccess }: RazorpayWidgetProps) => {
  // const amount = 10, label = `Pay ₹${amount}`, name = "Guest", email = "guest@example.com", contact = "9999999999";

  const handlePayment = async (load) => {
    console.log(load);
    // const loaded = await loadRazorpay()
    // if (!loaded) return alert("Failed to load Razorpay SDK")

    // const res = await fetch(`${process.env.REACT_APP_SERVERFUNCTION_ENDPOINT}api/createOrder`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount }),
    // })

    // const order = await res.json()

    // const options = {
    //   key: process.env.REACT_APP_RAZORPAY_KEY!,
    //   amount: order.amount,
    //   currency: order.currency,
    //   name: "DONATION",
    //   description:
    //     "Help cover urgent medical care for burn victims and other critical cases in underserved slums.",
    //   order_id: order.id,
    //   handler: function (response: any) {
    //     console.log("✅ Payment Success:", response)
    //     onSuccess?.(response)
    //   },
    //   prefill: { name, email, contact },
    //   theme: { color: "#0d6efd" },
    // }

    // const razorpay = new (window as any).Razorpay(options)
    // razorpay.open()
  };

  return (
    <div id={id} className="text-center p-5">
      <DynamicForm formData={data.formData} onSubmit={handlePayment} />
      <button onClick={handlePayment} className="btn-lime">
        Pay
      </button>
    </div>
  );
};

export default RazorpayWidget;
