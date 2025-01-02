<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meals extends Model
{
    

    protected $fillable = [
        'mealName',
        'mealPrices',
        'mealCategory',
        'image',
    ];
   /**
     * Get the category this meal belongs to.
     */
    public function mealCategory()
    {
        return $this->belongsTo(MealCategory::class, 'mealCategory');
    }

}
