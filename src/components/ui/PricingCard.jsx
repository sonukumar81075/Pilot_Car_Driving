import { Bike, Car, Check, ShoppingCart } from 'lucide-react'
import React from 'react'

const PricingCard = ({ data }) => {
    return (
        <div className="mt-16 flex flex-wrap justify-center gap-8">
            {data.plans.map((plan, index) => (
                <div
                    key={plan.title}
                    className={`relative flex w-full max-w-md flex-col overflow-hidden rounded-3xl border-2 transition-all duration-300 ${plan.isPopular
                        ? "border-[#2563eb] shadow-2xl"
                        : "border-slate-100 shadow-sm"
                        }`}
                >
                    {/* Best Value Badge */}
                    {plan.isPopular && (
                        <div className="absolute right-6 top-6">
                            <span className="rounded-full bg-[#2563eb] px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                Best Value
                            </span>
                        </div>
                    )}

                    {/* Card Header */}
                    <div className="p-8 text-left">
                        <div className="flex items-center justify-between pt-6">
                            <h3 className="text-2xl font-bold text-slate-900">{plan.title}</h3>
                            <div className={`rounded-xl p-2 ${plan.isPopular ? 'bg-blue-50 text-blue-600' : 'bg-blue-50 text-blue-600'}`}>
                                {plan.icon === 'car' && <Car size={24} />}
                                {plan.icon === 'bike' && <Bike size={24} />}
                                {plan.icon === 'dual' && (
                                    <div className="flex gap-1">
                                        <Car size={18} />
                                        <Bike size={18} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="mt-4 text-sm  font-sans font-[500] text-[#262626] leading-[26px]  ">
                            {plan.description}
                        </p>

                        {/* Features List */}
                        <ul className="mt-8 space-y-4">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <div className="mt-1 rounded-full bg-emerald-50 p-0.5">
                                        <Check size={14} className="text-emerald-500" />
                                    </div>
                                    <span className="text-sm font-[500] text-[#262626]">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card Footer (Price & Button) */}
                    <div className={`mt-auto p-8 pt-0 ${plan.isPopular ? 'bg-blue-50/30' : 'bg-slate-50/50'}`}>
                        <div className="mb-6 flex items-baseline gap-2 pt-8">
                            <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                            <span className="text-sm font-medium text-slate-400">one-time payment</span>
                        </div>

                        <button className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-xl bg-[#2563eb] py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default PricingCard