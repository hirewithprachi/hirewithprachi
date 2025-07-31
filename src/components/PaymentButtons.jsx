import React from 'react';

export default function PaymentButtons() {
  const stripeUrl = localStorage.getItem('stripePublicKey') || 'https://buy.stripe.com/test_xxxxxxxxxxxxx';
  const paypalUrl = localStorage.getItem('paypalClientId') ? `https://www.paypal.com/checkoutnow?client-id=${localStorage.getItem('paypalClientId')}` : 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XXXXXXXXXXX';

  return (
    <section className="py-12 max-w-2xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Pay for Services</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <a href={stripeUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition mb-2">Pay with Stripe</a>
        <a href={paypalUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold shadow-lg hover:bg-yellow-500 transition mb-2">Pay with PayPal</a>
        {(localStorage.getItem('stripePublicKey') === null || localStorage.getItem('paypalClientId') === null) && <div className="text-red-600 text-xs mt-2">Payment links not set. Please update in Admin Integrations.</div>}
      </div>
    </section>
  );
} 