<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'stockName' => $this->stockName,
            'category' => $this->inventory_category->category,
            'amountPerQuantity'=> $this->amount_per_quantity,
            'measurement'=>$this->measurement,
            'currentStock' => $this->current_stock,
            'supplier'=>$this->supplier,
            'deliveryDate'=>$this->delivery_date,
            'expirationDate'=>$this->expiration_date
        ];
    }
}
