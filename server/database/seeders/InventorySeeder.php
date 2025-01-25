<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "stockName" => "Sugar",
                "category_id" => 1,
                "amount_per_quantity" => "2 Liters",
                "measurement" => "Liters",
                "current_stock" => 10,
                "supplier" => "XYZ Distributors",
                "delivery_date" => "2025-01-01",
                "expiration_date" => "2026-01-01",
            ],
            [
                "stockName" => "Coffee Beans",
                "category_id" => 1,
                "amount_per_quantity" => "1 Kilogram",
                "measurement" => "Kilograms",
                "current_stock" => 15,
                "supplier" => "ABC Coffee Co.",
                "delivery_date" => "2025-01-05",
                "expiration_date" => "2026-01-05",
            ],
            [
                "stockName" => "Milk (Whole)",
                "category_id" => 1,
                "amount_per_quantity" => "5 Liters",
                "measurement" => "Liters",
                "current_stock" => 20,
                "supplier" => "Fresh Farms Dairy",
                "delivery_date" => "2025-01-06",
                "expiration_date" => "2025-03-06",
            ],
            [
                "stockName" => "Green Tea Bags",
                "category_id" => 1,
                "amount_per_quantity" => "50 Bags",
                "measurement" => "Pack",
                "current_stock" => 30,
                "supplier" => "Tea Leaves Co.",
                "delivery_date" => "2025-01-03",
                "expiration_date" => "2026-01-03",
            ],
            [
                "stockName" => "Ice Cubes",
                "category_id" => 1,
                "amount_per_quantity" => "10 Kilograms",
                "measurement" => "Kilograms",
                "current_stock" => 50,
                "supplier" => "Frosty Ice Ltd.",
                "delivery_date" => "2025-01-07",
                "expiration_date" => null, // "N/A" converted to null for database compatibility
            ],
            [
                "stockName" => "Almond Milk",
                "category_id" => 1,
                "amount_per_quantity" => "1 Liter",
                "measurement" => "Liters",
                "current_stock" => 12,
                "supplier" => "NutriMilk Co.",
                "delivery_date" => "2025-01-02",
                "expiration_date" => "2025-07-02",
            ],
            [
                "stockName" => "Lemon Slices",
                "category_id" => 1,
                "amount_per_quantity" => "500 Grams",
                "measurement" => "Pack",
                "current_stock" => 25,
                "supplier" => "Fresh Fruits Co.",
                "delivery_date" => "2025-01-04",
                "expiration_date" => "2025-02-04",
            ],
            [
                "stockName" => "Bottled Water",
                "category_id" => 1,
                "amount_per_quantity" => "500 Milliliters",
                "measurement" => "Bottle",
                "current_stock" => 100,
                "supplier" => "PureSpring Water Co.",
                "delivery_date" => "2025-01-08",
                "expiration_date" => "2027-01-08",
            ],
            [
                "stockName" => "Honey",
                "category_id" => 1,
                "amount_per_quantity" => "500 Grams",
                "measurement" => "Jar",
                "current_stock" => 20,
                "supplier" => "SweetBee Farm",
                "delivery_date" => "2025-01-09",
                "expiration_date" => "2026-01-09",
            ],
            [
                "stockName" => "Orange Juice",
                "category_id" => 1,
                "amount_per_quantity" => "2 Liters",
                "measurement" => "Liters",
                "current_stock" => 25,
                "supplier" => "Citrus Fresh Co.",
                "delivery_date" => "2025-01-10",
                "expiration_date" => "2025-04-10",
            ],
        ];
        foreach ($data as $inventory) {
            DB::table('inventories')->insert([
                'stockName' => $inventory['stockName'],
                'category_id' => $inventory['category_id'],
                'amount_per_quantity' => $inventory['amount_per_quantity'],
                'measurement' => $inventory['measurement'],
                'current_stock' => $inventory['current_stock'],
                'supplier' => $inventory['supplier'],
                'delivery_date' => $inventory['delivery_date'],
                'expiration_date' => $inventory['expiration_date'] ?? null, // Handle null values
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

    }
}
