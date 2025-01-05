<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSuccessOrderRequest;
use App\Http\Resources\SuccessOrderResource;
use App\Models\SuccessOrder;
use Illuminate\Http\Request;

class SuccessOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $successOrder = SuccessOrder::with('user')->paginate(10);

       return SuccessOrderResource::collection($successOrder);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSuccessOrderRequest $request)
    {
        // Generate a unique invoice number
        $timestamp = now()->format('mdyHis');
        $randomNumber = random_int(1000, 9999);
        $invoiceNo = "INV-{$timestamp}-{$randomNumber}";
        $successOrder = [
            'crewID' => $request['crewID'],
            'invoiceNo' => $invoiceNo,
            'customerName' => $request['customerName'],
            'orderType' => $request['orderType'],
            'meals' => json_encode($request['meals']),
            'paymentMethod' => $request['paymentMethod'],
            'referenceNumber' => $request['referenceNumber'],
            'totalPrice' => $request['totalPrice'],
            'tender' => $request['tender'],
            'change' => $request['change']
        ];
        try {
            $save = SuccessOrder::create($successOrder);
            return response()->json([
                'message' => 'Success Order!',
                'order' => $save,
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
