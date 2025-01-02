<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'fullName' => 'Ericka Lacsamana',
            'phoneNumber'=>'09301423142',
            'role' => 'Owner',
            'email' => 'Ericka@whiskedcafe.com',
            'password' => Hash::make('password')
        ]);
        $this->call(MealCategory::class);
        $this->call(MealSeeder::class); 
    }
}
