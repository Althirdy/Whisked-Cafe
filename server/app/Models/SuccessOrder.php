<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuccessOrder extends Model
{
    protected $fillable = [
        'crewID',
        'customerName',
        'orderType',
        'invoiceNo',
        'meals',
        'paymentMethod',
        'referenceNumber',
        'totalPrice',
        'tender',
        'change',
    ];

    public function user(){
        return $this->belongsTo(User::class,'crewID');
    }
    
    public function getMealsAttribute($value)
    {
        return json_decode($value, true); // Decode to an associative array
    }
}
