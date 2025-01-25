<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryCategory extends Model
{
    protected $table = 'Inventory_category';

    public function inventory (){
        return $this->hasMany(Inventory::class,'category_id');
    }
}
