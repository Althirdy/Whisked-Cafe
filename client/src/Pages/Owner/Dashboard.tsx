import {
  BadgePercent,
  CupSoda,
  Mail,
  Phone,
  TrendingUp,
  User,
  UserCog,
} from "lucide-react";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { FetchReports } from "./Util/Dashboard_Util";
import { Employee_T } from "./EmployeeComp/Employee_T";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  const [reports, setReport] = useState<any>();
  const [activeEmployee, setActiveEmployee] = useState<Employee_T[]>();
  const _FetchReport = async () => {
    let url = `${BASE_URL}/v1/weeklyReport`;
    const res = await FetchReports(url);
    if (res.success) {
      setReport(res.data);
      console.log(res.data);
    } else {
      console.error(res.message);
    }
  };
  const _FetchActiveEmployee = async () => {
    let url = `${BASE_URL}/v1/activeEmployee`;
    const res = await FetchReports(url);
    if (res.success) {
      setActiveEmployee(res.data.data);
    } else {
      console.error(res.message);
    }
  };

  useEffect(() => {
    _FetchReport();
    _FetchActiveEmployee();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Cards
          title="Sales Today"
          value={`₱ ${reports?.todaySales || "0"}.00`}
          icon={<BadgePercent size={25} className="text-gray-600" />}
        />
        <Cards
          title="Monthly Sales"
          value={`₱ ${reports?.monthlySales || "0"}.00`}
          icon={<TrendingUp size={25} className="text-gray-600" />}
        />
        <Cards
          title="Today Online Orders"
          value={`${reports?.pendingOrdersCount || "0"}`}
          icon={<CupSoda size={25} className="text-gray-600" />}
        />
        <Cards
          title="Today Online Sales"
          value={`₱ ${reports?.completedOrdersSalesToday || "0"}`}
          icon={<CupSoda size={25} className="text-gray-600" />}
        />
        {/* <Cards /> */}
      </div>
      <div className="grid grid-cols-1 mt-4 gap-2 lg:grid-cols-4">
        <div className="bg-white border col-span-2 space-y-2 shadow-sm  rounded-md p-4">
          <div className="flex-col flex">
            <h3 className="text-brown-600 font-medium">Weekly Sales</h3>
            <p className="text-gray-800 text-sm">In store</p>
          </div>
          {reports?.weeklySales?.dates?.length > 0 &&
            reports?.weeklySales?.total_sales?.length > 0 && (
              <BarChart
                series={[
                  {
                    data: reports.weeklySales.total_sales,
                    color: "#8B4513",
                  },
                ]}
                height={290}
                xAxis={[
                  {
                    data: reports.weeklySales.dates,
                    scaleType: "band",
                  },
                ]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            )}
        </div>
        <div className="bg-white border col-span-2 space-y-2 shadow-sm  rounded-md p-4">
          <div className="flex-col flex">
            <h3 className="text-brown-600 font-medium">Active Employees</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {activeEmployee &&
              activeEmployee?.length > 0 &&
              activeEmployee?.map((item, index) => (
                <EmployeeCard employee_data={item} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Cards({
  title,
  value,
  icon,
}: {
  title: React.ReactNode;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-md bg-white flex justify-between border shadow-sm">
      <div className="border-l-4 pl-2 border-brown-600">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-3xl font-bold text-gray-700">{value}</p>
      </div>
      {icon}
    </div>
  );
}

function EmployeeCard({ employee_data }: { employee_data: Employee_T }) {
  return (
    <div className="border space-y-2 relative rounded-md p-4 bg-white">
      <div className="flex items-center gap-2 text-gray-900">
        <User size={15} />
        <span className=" text-md font-bold">{employee_data.fullName}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Mail size={15} />
        <span className=" text-sm">{employee_data.email}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Phone size={15} />
        <span className=" text-sm">{employee_data.phoneNumber}</span>
      </div>
      <div className="text-sm   gap-2 border flex items-center justify-center   p-2 rounded-md">
        <UserCog size={15} />
        {employee_data.role}
      </div>
    </div>
  );
}

export default Dashboard;
