<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MealCategory extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ["Hot Coffee","Iced Coffee","Non-Coffee","Matcha Edition","Premium","Pastry"];

        foreach($categories as $category){
            DB::table('meal_categories')->insert([
                'category' => $category,
                'created_at' => now(),
                'updated_at' => now()

            ]);
        }
    }
}
