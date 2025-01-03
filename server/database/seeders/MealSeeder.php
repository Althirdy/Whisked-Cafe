<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $meals = [
            [
                "mealName" => "Spanish Latte",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 45.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 79.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 99.00
                    ]
                ],
                "mealCategory" => 2,
                "image" => "spanish_latte.png",
            ],
            [
                "mealName" => "Amerikano",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 45.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 79.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 99.00
                    ]
                ],
                "mealCategory" => 2,
                "image" => "amerikano.png",
            ],
            [
                "mealName" => "Capuccino",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 49.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 89.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 109.00
                    ]
                ],
                "mealCategory" => 2,
                "image" => "iced_capuccino.png",
            ],
            [
                "mealName" => "Vanilla Latte",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 45.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 79.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 99.00
                    ]
                ],
                "mealCategory" => 2,
                "image" => "iced_latte.png",
            ],
            [
                "mealName" => "Caramel",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 45.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 79.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 99.00
                    ]
                ],
                "mealCategory" => 2,
                "image" => "caramel.png",
            ],
            [
                "mealName" => "Crossini",
                "mealPrices" => [
                    [
                        "price" => 100.00
                    ]
                ],
                "mealCategory" => 5,
                "image" => "crossini.png",
            ],
            [
                "mealName" => "White Chocolate Chip",
                "mealPrices" => [
                    [
                        "price" => 100.00
                    ]
                ],
                "mealCategory" => 5,
                "image" => "white_choco_chip.png",
            ],
            [
                "mealName" => "Red Velvet Cookie",
                "mealPrices" => [
                    [
                        "price" => 100.00
                    ]
                ],
                "mealCategory" => 5,
                "image" => "red_velvet_cookie.png",
            ],
            [
                "mealName" => "Hotdog Bun",
                "mealPrices" => [
                    [
                        "price" => 100.00
                    ]
                ],
                "mealCategory" => 5,
                "image" => "hotdog_bun.png",
            ],
            [
                "mealName" => "Dark Chocolate Chip",
                "mealPrices" => [
                    [
                        "price" => 100.00
                    ]
                ],
                "mealCategory" => 5,
                "image" => "dark_choco_chip.png",
            ],
            [
                "mealName" => "Capuccino",
                "mealPrices" => [
                    [
                        "size" => "8oz",
                        "price" => 59.00
                    ]
                ],
                "mealCategory" => 1,
                "image" => "capuccino.png",
            ],
            [
                "mealName" => "Vanilla",
                "mealPrices" => [
                    [
                        "size" => "8oz",
                        "price" => 59.00
                    ]
                ],
                "mealCategory" => 1,
                "image" => "vanilla.png",
            ],
            [
                "mealName" => "Brewed Coffee",
                "mealPrices" => [
                    [
                        "size" => "8oz",
                        "price" => 45.00
                    ]
                ],
                "mealCategory" => 1,
                "image" => "brewed.png",
            ],
            [
                "mealName" => "Hot Chocolate",
                "mealPrices" => [
                    [
                        "size" => "8oz",
                        "price" => 50.00
                    ]
                ],
                "mealCategory" => 1,
                "image" => "choco.png",
            ],
            [
                "mealName" => "Hazelnut",
                "mealPrices" => [
                    [
                        "size" => "8oz",
                        "price" => 59.00
                    ]
                ],
                "mealCategory" => 1,
                "image" => "hazelnut.png",
            ],
            [
                "mealName" => "Matcha Latte",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 49.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 89.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 99.00
                    ]
                ],
                "mealCategory" => 4,
                "image" => "matcha_latte.png",
            ],
            [
                "mealName" => "Kiwi Matcha",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 59.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 89.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 109.00
                    ]
                ],
                "mealCategory" => 4,
                "image" => "matcha.png",
            ],
            [
                "mealName" => "Blueberry Matcha",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 59.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 89.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 109.00
                    ]
                ],
                "mealCategory" => 4,
                "image" => "blueberry_matcha.png",
            ],
            [
                "mealName" => "Strawberry Matcha",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 59.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 89.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 109.00
                    ]
                ],
                "mealCategory" => 4,
                "image" => "strawberry_matcha.png",
            ],
            [
                "mealName" => "Kiwi Latte",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 45.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 79.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 89.00
                    ]
                ],
                "mealCategory" => 3,
                "image" => "latte_kiwi.png",
            ],
            [
                "mealName" => "Chocolate Latte",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 49.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 79.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 89.00
                    ]
                ],
                "mealCategory" => 3,
                "image" => "latte_choco.png",
            ],
            [
                "mealName" => "Mango Latte",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 45.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 79.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 99.00
                    ]
                ],
                "mealCategory" => 3,
                "image" => "latte_mango.png",
            ],
            [
                "mealName" => "Oreo Latte",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 59.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 89.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 109.00
                    ]
                ],
                "mealCategory" => 3,
                "image" => "latte_oreo.png",
            ],
            [
                "mealName" => "Strawberry Latte",
                "mealPrices" => [
                    [
                        "size" => "12oz",
                        "price" => 49.00
                    ],
                    [
                        "size" => "16oz",
                        "price" => 89.00
                    ],
                    [
                        "size" => "22oz",
                        "price" => 99.00
                    ]
                ],
                "mealCategory" => 3,
                "image" => "latte_strawberry.png",
            ],
        ];

        foreach ($meals as $meal) {
            DB::table('meals')->insert([
                'mealName' => $meal['mealName'],
                'mealPrices' => json_encode($meal['mealPrices']),
                'mealCategory' => $meal['mealCategory'],
                'image' => $meal['image'],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
