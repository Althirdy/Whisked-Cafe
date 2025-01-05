<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuccessOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'id' => $this->id,
            'invoiceNo' => $this->invoiceNo,
            'customerName' => $this->customerName,
            'orderType' => $this->orderType,
            'meals' => json_decode($this->meals), 
            'paymentMethod' => $this->paymentMethod,
            'referenceNumber' => $this->referenceNumber,
            'tender' => $this->tender,
            'totalPrice' => $this->totalPrice,
            'change' => $this->change,
            'created_at' => $this->created_at,
            // Only return the required user details
            'user' => [
                'fullName' => $this->user->fullName,
                'role' => $this->user->role,
            ]
        ];
    }
}
