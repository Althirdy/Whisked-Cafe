import { BadgePercent, CupSoda, TrendingUp } from "lucide-react";

function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Cards
          title="Sales Today"
          value="₱ 5,000"
          icon={<BadgePercent size={25} className="text-gray-600" />}
        />
        <Cards
          title="Monthly Sales"
          value="₱ 10,000"
          icon={<TrendingUp size={25} className="text-gray-600" />}
        />
        <Cards
          title="Online Orders"
          value="20"
          icon={<CupSoda size={25} className="text-gray-600" />}
        />
        {/* <Cards /> */}
      </div>
    </div>
  );
}

function Cards({
  title,
  value,
  icon,
}: {
  title: string;
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

export default Dashboard;
