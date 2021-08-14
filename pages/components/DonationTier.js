export default function DonationTier({
  tier,
}) {
  return (
    <div key={tier.name} className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
      <div className="p-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">{tier.name}</h2>
        <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
        <p className="mt-8">
          <span className="text-4xl font-extrabold text-gray-900">${tier.priceMonthly}</span>{' '}
          <span className="text-base font-medium text-gray-500">/mo</span>
        </p>
        <a
          href={tier.href}
          className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
        >
          Buy {tier.name}
        </a>
      </div>
    </div>
  )
}