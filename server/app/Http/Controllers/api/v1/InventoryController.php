<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\InventoryRequest;
use App\Http\Resources\InventoryResource;
use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('query');

        $inventoryQuery = Inventory::with('inventory_category');

        // Apply filtering if 'query' is present in the request
        if ($query) {
            $inventoryQuery->where(function ($q) use ($query) {
                $q->where('stockName', 'LIKE', "%$query%")
                    ->orWhere('current_stock', 'LIKE', "%$query%")
                    ->orWhere('measurement', 'LIKE', "%$query%")
                    ->orWhere('supplier', 'LIKE', "%$query%");
            });
        }

        $inventory = $inventoryQuery->orderBy('current_stock')->paginate(10);

        return InventoryResource::collection($inventory);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InventoryRequest $request)
    {
    
        $validatedData = $request->validated();
        $inventory = Inventory::create([
            'stockName' => $validatedData['stockName'],
            'current_stock' => $validatedData['quantity'],
            'amount_per_quantity' => $validatedData['amountPerQuantity'],
            'measurement' => $validatedData['measurement'],
            'category_id' => $validatedData['category'] ?? null,  // If nullable, assign null if not provided
            'supplier' => $validatedData['supplier'],
            'delivery_date' => $validatedData['deliveryDate'],
            'expiration_date' => $validatedData['expirationDate'],
        ]);
        return response()->json([
            'message' => 'Inventory item created successfully!',
        ], 201);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
