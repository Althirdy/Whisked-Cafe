<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MealCategory extends Model
{
    

    public function meals()
    {
        return $this->hasMany(Meals::class, 'mealCategory');
    }
}
