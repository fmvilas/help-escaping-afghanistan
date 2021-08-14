export default function Card({children, className}) {
  return (
    <div className={className}>
      <div className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="w-full flex items-center justify-between p-6 space-x-6">
          <div className="flex-1 truncate">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}