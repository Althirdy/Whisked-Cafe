<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\MealResource;
use App\Models\Meals;
use Illuminate\Http\Request;

class CustomController extends Controller
{
    /**
     * FetchMenu for the ownerSide for Updating the meals
     */
    public function fetchMenu(Request $request)
    {
        $query = $request->input('category');

        // Check if the 'category' query parameter is set
        if ($query) {
            $meals = Meals::with('mealCategory')->where('mealCategory', $query)->paginate(12);
        } else {
            $meals = Meals::with('mealCategory')->paginate(12);
        }

        return MealResource::collection($meals);
    }
}
