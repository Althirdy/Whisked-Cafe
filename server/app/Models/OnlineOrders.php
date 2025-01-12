<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OnlineOrders extends Model
{
    //
    protected $fillable = [
        'invoiceNo',
        'customerId',
        'crewId',
        'meals',
        'totalPrice',
        'referenceNumber',
        'pickUp',
        'time',
        'status',
        'orderNote',
        'cancelReason'
    ];



    public function crew()
    {
        return $this->belongsTo(User::class, 'crewId');
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customerId');
    }
}
