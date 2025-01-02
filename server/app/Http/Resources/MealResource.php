<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MealResource extends JsonResource
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
            'mealName' => $this->mealName,
            'mealPrices' => json_decode($this->mealPrices),
            'mealCategory'=> $this->mealCategory ? $this->mealCategory : null,
            'image'=> asset('images/' . $this->image)
        ];
    }
}
