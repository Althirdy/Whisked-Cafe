<?php

use App\Http\Controllers\api\v1\AuthController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;



Route::prefix('v1')->middleware('auth:sanctum')->group(function(){
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/mealCategory', function () {
        $categories = DB::table('meal_categories')->select('id', 'category')->get();
        return response()->json($categories);
    });
});

Route::post('/v1/login', [AuthController::class, 'login']);
