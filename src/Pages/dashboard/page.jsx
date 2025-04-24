import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { overviewData } from '../../constants';
import { CreditCard, DollarSign, Package, PencilLine, Star, Trash, TrendingUp, Users } from "lucide-react";
const page = () => {
  return (
   <>
  <div className="flex flex-col gap-y-4">
    <h1 className="title">Dashboard</h1>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="card">
            <div className="card-header">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 ">
                    <Package size={26} />
                </div>
                <p className="card-title">Total Products</p>
            </div>
            <div className="card-body bg-slate-100  ">
                <p className="text-3xl font-bold text-slate-900">87</p>
                <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                    <TrendingUp size={18} />
                    25%
                </span>
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                    <DollarSign size={26} />
                </div>
                <p className="card-title">Total Paid Orders</p>
            </div>
            <div className="card-body bg-slate-100 ">
                <p className="text-3xl font-bold text-slate-900 ">12300DZ</p>
                <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                    <TrendingUp size={18} />
                    12%
                </span>
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                    <Users size={26} />
                </div>
                <p className="card-title">Total Customers</p>
            </div>
            <div className="card-body bg-slate-100 ">
                <p className="text-3xl font-bold text-slate-900 ">54,00</p>
                <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                    <TrendingUp size={18} />
                    15%
                </span>
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                    <CreditCard size={26} />
                </div>
                <p className="card-title">Sales</p>
            </div>
            <div className="card-body bg-slate-100">
                <p className="text-3xl font-bold text-slate-900">110,00</p>
                <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                    <TrendingUp size={18} />
                    19%
                </span>
            </div>
        </div>
    </div>
   </div>
   

   
     <div className="card col-span-1 md:col-span-2 lg:col-span-4 mt-4">
       <div className="card-header">
           <p className="card-title">Overview</p>
       </div>
       <div className="card-body p-0">
           <ResponsiveContainer
               width="100%"
               height={300}
           >
               <AreaChart
                   data={overviewData}
                   margin={{
                       top: 0,
                       right: 0,
                       left: 0,
                       bottom: 0,
                   }}
               >
                   <defs>
                       <linearGradient
                           id="colorTotal"
                           x1="0"
                           y1="0"
                           x2="0"
                           y2="1"
                       >
                           <stop
                               offset="5%"
                               stopColor="#2563eb"
                               stopOpacity={0.8}
                           />
                           <stop
                               offset="95%"
                               stopColor="#2563eb"
                               stopOpacity={0}
                           />
                       </linearGradient>
                   </defs>
                   <Tooltip
                       cursor={false}
                       formatter={(value) => `$${value}`}
                   />

                   <XAxis
                       dataKey="name"
                       strokeWidth={0}
                       
                       tickMargin={6}
                   />
                   <YAxis
                       dataKey="total"
                       strokeWidth={0}
                      
                       tickFormatter={(value) => `$${value}`}
                       tickMargin={6}
                   />

                   <Area
                       type="monotone"
                       dataKey="total"
                       stroke="#2563eb"
                       fillOpacity={1}
                       fill="url(#colorTotal)"
                   />
               </AreaChart>
           </ResponsiveContainer>
       </div>
   </div>
  </>
  )
}

export default page
