import React, { useState, useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { overviewData } from '../../constants';
import { CreditCard, DollarSign, Package, Users, TrendingUp } from "lucide-react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const Page = () => {
  const [statistics, setStatistics] = useState({
    total_products: 0,
    total_orders: 0,
    total_users: 0,
    total_revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth('Store/statistics/');
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        const data = await response.json();
        setStatistics(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error: {error}
      </div>
    );
  }

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
            <div className="card-body bg-slate-100 flex justify-center items-center">
                <p className="text-3xl font-bold text-slate-900">{statistics.total_products}</p>
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                    <DollarSign size={26} />
                </div>
                <p className="card-title">Total Revenue</p>
            </div>
            <div className="card-body bg-slate-100 flex justify-center items-center">
                <p className="text-3xl font-bold text-slate-900">
                    {statistics.total_revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} DZD
                </p>
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                    <Users size={26} />
                </div>
                <p className="card-title">Total Customers</p>
            </div>
            <div className="card-body bg-slate-100 flex justify-center items-center">
                <p className="text-3xl font-bold text-slate-900">{statistics.total_users}</p>
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                    <CreditCard size={26} />
                </div>
                <p className="card-title">Total Orders</p>
            </div>
            <div className="card-body bg-slate-100 flex justify-center items-center">
                <p className="text-3xl font-bold text-slate-900">{statistics.total_orders}</p>
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

export default Page
