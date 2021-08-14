import Head from 'next/head'
import { useState } from 'react'
import Script from 'next/script'
import Card from './components/Card'

const tiers = {
  price_1JOKBNCDK8etNbTKMW1r9KIx: {
    name: '€25',
    priceId: 'price_1JOKBNCDK8etNbTKMW1r9KIx',
  },
  price_1JOKBxCDK8etNbTKhRLmD5F1: {
    name: '€100',
    priceId: 'price_1JOKBxCDK8etNbTKhRLmD5F1',
  },
}

export default function Home() {
  const [tier, setTier] = useState(tiers['price_1JOKBNCDK8etNbTKMW1r9KIx'])
  const [error, setError] = useState()

  const redirectToCheckout = (priceId) => {
    if (typeof window === 'undefined') return null
    const stripe = window.Stripe('pk_test_51JOJnNCDK8etNbTKBTHsOKvmhHu68XQU9FzFcPnHgMe2DPEcm6N8U1UWnk0FZFYkDEnUfzdNL9byq25eH8Cnu8b900ZTz8RXvj')

    stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      /*
       * Do not rely on the redirect to the successUrl for fulfilling
       * purchases, customers may not always reach the success_url after
       * a successful payment.
       * Instead use one of the strategies described in
       * https://stripe.com/docs/payments/checkout/fulfill-orders
       */
      successUrl: 'http://localhost:3000/thanks',
      cancelUrl: 'http://localhost:3000/cancelled',
    })
      .then(function (result) {
        if (result.error) {
          /*
           * If `redirectToCheckout` fails due to a browser or network
           * error, display the localized error message to your customer.
           */
          setError(result.error.message)
        }
      })
  }

  return (
    <div className="bg-white">
      <Head>
        <title>Help escaping Afghanistan</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="https://js.stripe.com/v3"></Script>
      </Head>
      {error && (<div>{error}</div>)}

      <div className="w-full bg-cover bg-center bg-blend-overlay bg-gray-800" style={{ backgroundImage: 'url(herat.jpg)' }}>
        <h1 className="py-48 text-6xl text-white font-bold text-center">
          <span className="px-24 py-16">Help escaping Afghanistan</span>
        </h1>
      </div>
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:grid-flow-col-dense lg:gap-24">
        <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0 lg:col-span-2">
          <div>
            <div className="prose lg:prose-xl">
              <p>
                Hi! This is Lukasz and Fran on behalf of our friend. We&apos;re trying to fundraise for him and his family to escape from the war in Afghanistan. This is his story:
              </p>
              <p>
                ---
              </p>
              <p>
                I am a programmer from Herat, Afghanistan. I can&apos;t disclose my name for the reasons that I will explain later. I was fortunate enough to get a scholarship and graduate from Pune University. When I lived in India to complete my bachelor&apos;s degree, the Taliban were expanding their territory over Afghanistan. I heard a lot of horror stories from my family and relatives that were living in Afghanistan. 6 Months ago, I graduated and came back to Herat, Afghanistan. Although my family members were not happy with my decision by coming back, but I couldn&apos;t leave my family alone to the horror that was coming for them.
              </p>
              <p>
                After coming back to Afghanistan, I started contributing to open source. It was a go-to relief for me In the hard days of the war. To get involved in a community that was eager to help each other and as a result, create something beautiful for everyone. It just helped me forget the terrors that my relatives were enduring under the Taliban regime and the fact that each day they are closing in.
              </p>
              <p>
                In the past few days when the war was at its peak, it was hard to see my 4 years old sister cry to sleep while hearing the most horrific explosions and gun fires around her.
              </p>
              <p>
                By the time that I am writing this, Taliban took over the city, and escaping Afghanistan became impossible for us because it&apos;s hard to escape a country when you are barely above the poverty line. Since the open-source contribution is not a common thing, My family and I are one &quot;Hey, this guy worked for non-believers of Islam&quot; away from getting killed or tortured. They killed people for less than that. You can never explain open-source to someone who hasn&apos;t read a single line of text in his entire life. And this is the reason that I&apos;m not disclosing my name here.
              </p>
              <p>
                All of the foreign organizations have evacuated their employees and people who have helped them in Afghanistan because in their view, working for non-believers of Islam is the biggest sin that you can commit.
              </p>
              <p>
                Fortunately, I have friends like Fran and Lukasz who came up with this campaign to help me and my family escape to a neighboring country.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-0">
          <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
            <Card className="lg:mt-12 sticky top-16">
              <div>
                <h3 className="text-lg mb-4 font-bold">Help them escape from war</h3>
                <label htmlFor="donation" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose your donation:
                </label>
                <select
                  id="donation"
                  name="donation"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={tier.priceId}
                  onChange={ev => {
                    setTier(tiers[ev.target.value])
                  }}
                >
                  {Object.keys(tiers).map((tierKey) => (
                    <option key={tierKey} value={tierKey}>{tiers[tierKey].name}</option>
                  ))}
                </select>
              </div>
              <div className="mt-6">
                <a
                  className="block text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700 cursor-pointer"
                  onClick={() => {
                    redirectToCheckout(tier.priceId)
                  }}
                >
                  Donate now
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>


      
    </div>
  )
}
