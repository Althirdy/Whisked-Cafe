<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $fillable = [
        'stockName',
        'category_id',
        'amount_per_quantity',
        'measurement',
        'current_stock',
        'supplier',
        'delivery_date',
        'expiration_date'
    ];

    public function inventory_category()
    {
        return $this->belongsTo(InventoryCategory::class, 'category_id');
    }
}
