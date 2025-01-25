<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\OnlineOrdersRequest;
use App\Http\Resources\OnlineOrderResource;
use App\Models\OnlineOrders;
use Illuminate\Http\Request;

class OnlineOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = OnlineOrders::with(['crew', 'customer']); // Base query with relationships

        // Filter by customerId if provided
        if ($customerId = $request->input('customerId')) {
            $query->where('customerId', $customerId);
        }

        // Filter by date (default to today if not provided)
        $date = $request->input('date', now()->toDateString());
        $query->whereDate('created_at', $date);

        // Apply search query if provided
        if ($search = $request->input('query')) {
            $query->where(function ($q) use ($search) {
                $q->where('invoiceNo', 'LIKE', "%{$search}%")
                    ->orWhere('referenceNumber', 'LIKE', "%{$search}%")
                    ->orWhereHas('customer', function ($subQuery) use ($search) {
                        $subQuery->where('fullName', 'LIKE', "%{$search}%");
                    });
            });
        }

        // Add sorting if needed
        $query->orderBy('created_at', 'desc');

        // Paginate results
        $orders = $query->paginate(10);

        // Return as a resource collection
        return OnlineOrderResource::collection($orders);
        // return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OnlineOrdersRequest $request)
    {
        $timestamp = now()->format('mdyHis');
        $randomNumber = random_int(1000, 9999);
        $invoiceNo = "INV-{$timestamp}-{$randomNumber}";
        $onlineOrder = [
            'invoiceNo' => $invoiceNo,
            'customerId' => $request['customerId'],
            'meals' => $request['meals'],
            'totalPrice' => $request['totalPrice'],
            'pickUp' => $request['pickUp'],
            'referenceNumber' => $request['referenceNumber'],
            'orderNote' => $request['note'],
            'time' => $request['time'],
        ];
        // return response()->json([
        //     'data' => $onlineOrder
        // ]);
        try {
            $save = OnlineOrders::create($onlineOrder);
            return response()->json([
                'message' => 'Success Order!',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while saving!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = OnlineOrders::findOrFail($id);  // Fetch the employee
        if ($request['cancelReason']) {
            $order->cancelReason = $request['cancelReason'];
        }
        $order->status = $request['status'];
        $order->crewId = $request['crewId'];
        $order->save();
        return response()->json(['message' => 'Password updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
