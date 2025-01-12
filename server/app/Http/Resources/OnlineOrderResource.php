<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OnlineOrderResource extends JsonResource
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
            'meals' => json_decode($this->meals),
            'referenceNumber' => $this->referenceNumber,
            'totalPrice' => $this->totalPrice,
            'status' => $this->status,
            'pickUp' => $this->pickUp,
            'time' => $this->time,
            'orderNote' => $this->orderNote ? $this->orderNote : '',
            'cancelReason' => $this->cancelReason ? $this->cancelReason : '',
            // Only return the required user details
            'customer' => [
                'fullName' => $this->customer->fullName,
                'phoneNumber' => $this->customer->phoneNumber,
            ],
            'crew' => $this->crew ? [
                'fullName' => $this->crew->fullName,
                'phoneNumber' => $this->crew->phoneNumber,
            ] : null
        ];
    }
}
