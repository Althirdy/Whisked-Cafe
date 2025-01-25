<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\MealResource;
use App\Http\Resources\UserResource;
use App\Models\InventoryCategory;
use App\Models\Meals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomController extends Controller
{
    /**
     * FetchMenu for the ownerSide for Updating the meals
     */
    public function fetchMenu(Request $request)
    {
        $query = $request->input('category');

        // Check if the 'category' query parameter is set
        if ($query) {
            $meals = Meals::with('mealCategory')->where('mealCategory', $query)->paginate(12);
        } else {
            $meals = Meals::with('mealCategory')->paginate(12);
        }

        return MealResource::collection($meals);
    }

    public function weeklySales()
    {

        // Get total sales for today from success_orders
        $todaySales = DB::table('success_orders')
            ->whereDate('created_at', today())
            ->sum('totalPrice');

        // Get total sales for the current month
        $monthlySales = DB::table('success_orders')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('totalPrice');

        // Query to get total sales grouped by date (last 7 days) from success_orders
        $salesData = DB::table('success_orders')
            ->select(DB::raw("DATE(created_at) as order_date, SUM(totalPrice) as total_sales"))
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy(DB::raw("DATE(created_at)"))
            ->get()
            ->keyBy('order_date');

        // Generate the dates for the last 7 days including today
        $last7Days = collect(range(0, 6))->map(function ($day) {
            return now()->subDays($day)->toDateString(); // e.g., "2025-01-14"
        })->reverse(); // Ensure chronological order

        // Map the sales data into a consistent format with all dates accounted for
        $weeklySales = $last7Days->map(function ($date) use ($salesData) {
            return [
                'date' => $date,
                'total_sales' => $salesData->get($date)?->total_sales ?? 0,
            ];
        });

        // Get total sales for today from online_orders where status is 'COMPLETED'
        $completedOrdersSalesToday = DB::table('online_orders')
            ->whereDate('created_at', today()) // Only today's orders
            ->where('status', 'COMPLETED') // Filter by 'COMPLETED' status
            ->sum('totalPrice'); // Get the sum of totalPrice for completed orders

        // Get count of pending orders for today
        $pendingOrdersCount = DB::table('online_orders')
            ->whereDate('created_at', today()) // Only today's orders
            ->where('status', 'pending') // Filter by 'pending' status
            ->count(); // Get the count of pending orders

        // Return response with weekly, today, and monthly sales data, along with completed sales and pending order count
        return response()->json([
            'weeklySales' => [
                'dates' => $weeklySales->pluck('date')->toArray(),
                'total_sales' => $weeklySales->pluck('total_sales')->toArray(),
            ],
            'todaySales' => $todaySales,
            'monthlySales' => $monthlySales,
            'completedOrdersSalesToday' => $completedOrdersSalesToday, // Add completed orders sales today
            'pendingOrdersCount' => $pendingOrdersCount, // Add pending orders count
        ]);
    }
    public function ActiveEmployee()
    {
        // Fetch active employees where isOnline is true and role is not 'customer' or 'owner'
        $activeEmployees = DB::table('users')
            ->where('isOnline', true)
            ->whereNotIn('role', ['Customer', 'Owner'])
            ->get();

        return UserResource::collection($activeEmployees);
    }
}
