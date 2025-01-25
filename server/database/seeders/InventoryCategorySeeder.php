<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InventoryCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ["Drinks", "Pastry", "Base Ingredients"];

        foreach ($categories as $category) {
            DB::table('inventory_category')->insert([
                'category' => $category,
                'created_at' => now(),
                'updated_at' => now()   
            ]);
        }
    }
}
